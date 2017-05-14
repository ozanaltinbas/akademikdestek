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
import { Options } from '../../../../../../both/models/options.model';
import { CurrentUser } from '../../../../services/currentUser.service';

import 'rxjs/add/operator/map';

import '../../../../../../both/methods/post-comments.methods.ts';

import { Posts } from '../../../../../../both/collections/posts.collection';
import { Post } from '../../../../../../both/models/post.model';
import { PostComments } from '../../../../../../both/collections/post-comments.collection';
import { PostComment } from '../../../../../../both/models/post-comment.model';

import template from './post-detail.component.html';
import style from './post-detail.component.scss';

@Component({
    selector: 'post-detail',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class PostDetailComponent implements OnInit, OnDestroy {

    postId: string;
    error: string = '';
    success: string = '';
    paramsSub: Subscription;
    post: Post;
    postSub: Subscription;
    user: Meteor.User;
    postCommentForm: FormGroup;
    onProgress: boolean = false;
    postComments: Observable<PostComment[]>;
    postCommentsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    postCommentsSize: number = 0;
    autorunSub: Subscription;
    imagesSubs: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private translateService: TranslateService,
                private paginationService: PaginationService,
                private currentUser: CurrentUser) {}

    ngOnInit() {
        // subscribe to images
        this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
        // initialize post comment entry form
        this.initializePostCommentEntryForm();
        // get the input route param
        this.paramsSub = this.route.params
            .map(params => params['postId'])
            .subscribe(postId => {
                this.postId = postId;

                this.post = Posts.findOne(this.postId);

                if (!this.post) {
                    this.router.navigate(['/posts']);
                }

                window.scrollTo(0, 0);

                this.postSub = MeteorObservable.subscribe('post-detail', this.postId).subscribe(() => {
                    MeteorObservable.autorun().subscribe(() => {
                        this.post = Posts.findOne(this.postId);
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

                    if (this.postCommentsSub) {
                        this.postCommentsSub.unsubscribe();
                    }

                    this.postCommentsSub = MeteorObservable.subscribe('post-comments', this.postId, options).subscribe(() => {
                        this.postComments = PostComments.find({}, {
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
                    totalItems: this.postCommentsSize
                });

                this.pageSize.next(5);
                this.curPage.next(1);

                this.autorunSub = MeteorObservable.autorun().subscribe(() => {
                    this.postCommentsSize = Counts.get('numberOfPostComments');
                    this.paginationService.setTotalItems(this.paginationService.defaultId(), this.postCommentsSize);
                });

            });
    }

    insertPostComment(event) {
        // initiailze error message
        this.error = '';
        // initialize success message
        this.success = '';
        // prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.postCommentForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('insertPostComment', this.postId, this.postCommentForm.value.content, this.user._id).subscribe(() => {
                // post comment successfully inserted
                this.initializePostCommentEntryForm();
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

    initializePostCommentEntryForm() : void {
        // initialize blog form
        this.postCommentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    deletePostComment(postComment: PostComment) : void {
        // if inputs are valid
        if (postComment) {
            // delete it
            MeteorObservable.call('deletePostComment', postComment._id, postComment.owner).subscribe(() => {
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
        this.postSub.unsubscribe();
        this.postCommentsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
        this.imagesSubs.unsubscribe();
    }

}