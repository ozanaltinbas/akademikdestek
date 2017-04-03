import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import 'rxjs/add/operator/combineLatest';

import { BlogComments } from '../../../../../../both/collections/blog-comments.collection';
import { BlogComment } from '../../../../../../both/models/blog-comment.model';

import template from './blog-comment-list.component.html';
import style from './blog-comment-list.component.scss';

interface Pagination {
    limit: number;
    skip: number;
}

interface Options extends Pagination {
    [key: string]: any
}

@Component({
    selector: 'blog-comment-list',
    template,
    styles: [ style ]
})
export class BlogCommentListComponent implements OnInit, OnDestroy {

    @Input() blogId: string;

    blogComments: Observable<BlogComment[]>;
    blogCommentsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    blogCommentsSize: number = 0;
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
    }

    ngAfterViewInit(): void {

    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    ngOnDestroy() {
        this.blogCommentsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

}