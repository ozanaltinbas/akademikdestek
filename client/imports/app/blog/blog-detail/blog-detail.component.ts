import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs/Subject';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../../../both/models/options.model';
import { CurrentUser } from '../../../services/currentUser.service';

import 'rxjs/add/operator/map';

import '../../../../../both/methods/post-comments.methods.ts';

import { Blogs } from '../../../../../both/collections/blogs.collection';
import { Blog } from '../../../../../both/models/blog.model';
import { BlogComments } from '../../../../../both/collections/blog-comments.collection';
import { BlogComment } from '../../../../../both/models/blog-comment.model';

import template from './blog-detail.component.html';
import style from './blog-detail.component.scss';

@Component({
    selector: 'blog-detail',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class BlogDetailComponent implements OnInit, OnDestroy {

    blogId: string;
    error: string = '';
    success: string = '';
    paramsSub: Subscription;
    blog: Blog;
    blogSub: Subscription;
    user: Meteor.User;
    blogCommentForm: FormGroup;
    onProgress: boolean = false;
    blogComments: Observable<BlogComment[]>;
    blogCommentsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    blogCommentsSize: number = 0;
    autorunSub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private translateService: TranslateService,
                private paginationService: PaginationService,
                private currentUser: CurrentUser) {}

    ngOnInit() {
        // initialize post comment entry form
        this.initializeBlogCommentEntryForm();
        // get the input route param
        this.paramsSub = this.route.params
            .map(params => params['blogId'])
            .subscribe(blogId => {
                this.blogId = blogId;

                this.blog = Blogs.findOne(this.blogId);

                if (!this.blog) {
                    this.router.navigate(['/blog']);
                }

                window.scrollTo(0, 0);

                this.blogSub = MeteorObservable.subscribe('blog-detail', this.blogId).subscribe(() => {
                    MeteorObservable.autorun().subscribe(() => {
                        this.blog = Blogs.findOne(this.blogId);
                    });
                });

                this.optionsSub = Observable.combineLatest(
                    this.pageSize,
                    this.curPage
                ).subscribe(([pageSize, curPage]) => {
                    const options: Options = {
                        limit: pageSize as number,
                        skip: ((curPage as number) - 1) * (pageSize as number),
                        sort: { createdAt: -1 }
                    };

                    this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);

                    if (this.blogCommentsSub) {
                        this.blogCommentsSub.unsubscribe();
                    }

                    this.blogCommentsSub = MeteorObservable.subscribe('blog-comments', this.blogId, options).subscribe(() => {
                        this.blogComments = BlogComments.find({}, {
                            sort: {
                                createdAt: -1
                            }
                        }).zone();
                    });
                });

                this.paginationService.register({
                    id: this.paginationService.defaultId(),
                    itemsPerPage: 5,
                    currentPage: 1,
                    totalItems: this.blogCommentsSize
                });

                this.pageSize.next(5);
                this.curPage.next(1);

                this.autorunSub = MeteorObservable.autorun().subscribe(() => {
                    this.blogCommentsSize = Counts.get('numberOfBlogComments');
                    this.paginationService.setTotalItems(this.paginationService.defaultId(), this.blogCommentsSize);
                });

            });
    }

    insertBlogComment(event) {
        // initiailze error message
        this.error = '';
        // initialize success message
        this.success = '';
        // prevent default event.
        event.preventDefault();
        // if the blog comment form is valid,
        if (this.blogCommentForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('insertBlogComment', this.blogId, this.blogCommentForm.value.content, this.user._id).subscribe(() => {
                // post comment successfully inserted
                this.initializeBlogCommentEntryForm();
                this.onProgress = false;
            }, (error) => {
                this.onProgress = false;
                console.log(error);
            });
        } // if form is not valid.
        else {
            // set the error message
            this.translateService.get('accounts.error.All fields required').subscribe((res: string) => {
                // print the error message
                this.error = res;
            });
        }
    }

    initializeBlogCommentEntryForm() : void {
        // initialize blog comment form
        this.blogCommentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    deleteBlogComment(blogComment: BlogComment) : void {
        // if inputs are valid
        if (blogComment) {
            // delete it
            MeteorObservable.call('deleteBlogComment', blogComment._id, blogComment.owner).subscribe(() => {
                // successfully deleted.

            }, (error) => {

            });
        }
    }

    isCurrentUser(owner: string) {
        return this.currentUser.isCurrentUser(owner);
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.blogSub.unsubscribe();
        this.blogCommentsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

}