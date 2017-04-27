import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../../../../../both/models/options.model';
import '../../../../../../../both/methods/post-comments.methods.ts';

import 'rxjs/add/operator/combineLatest';

import { PostComments } from '../../../../../../../both/collections/post-comments.collection';
import { PostComment } from '../../../../../../../both/models/post-comment.model';

import template from './post-comment-list.component.html';
import style from './post-comment-list.component.scss';

@Component({
    selector: 'post-comment-list',
    template,
    styles: [ style ]
})
export class PostCommentListComponent implements OnInit, OnDestroy {

    @Input() postId: string;

    postComments: Observable<PostComment[]>;
    postCommentsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    postCommentsSize: number = 0;
    autorunSub: Subscription;

    constructor(private paginationService: PaginationService) {

    }

    ngOnInit() {

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
    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    deletePostComment(postCommentId: string, owner: string) : void {
        // if inputs are valid
        if (postCommentId && postCommentId.length > 0 && owner && owner.length > 0) {
            // delete it
            MeteorObservable.call('deletePostComment', postCommentId, owner).subscribe(() => {
                // mail successfully sent.
                console.log("deleted")
            }, (error) => {
                console.log("error");
            });
        }
    }

    ngOnDestroy() {
        this.postCommentsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

}