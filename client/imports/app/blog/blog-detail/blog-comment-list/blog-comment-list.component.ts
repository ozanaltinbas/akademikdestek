import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { BlogComments } from '../../../../../../both/collections/blog-comments.collection';
import { BlogComment } from '../../../../../../both/models/blog-comment.model';

import template from './blog-comment-list.component.html';
import style from './blog-comment-list.component.scss';

@Component({
    selector: 'blog-comment-list',
    template,
    styles: [ style ]
})
export class BlogCommentListComponent implements OnInit, OnDestroy {

    @Input() blogId: string;
    blogComments: Observable<BlogComment[]>;
    blogCommentsSub: Subscription;

    constructor() {

    }

    ngOnInit() {
        if (this.blogCommentsSub) {
            this.blogCommentsSub.unsubscribe();
        }

        this.blogCommentsSub = MeteorObservable.subscribe('blog-comments', this.blogId).subscribe(() => {
            this.blogComments = BlogComments.find({}, {
                sort: {
                    createdAt: -1
                }
            }).zone();
        });
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy() {
        this.blogCommentsSub.unsubscribe();
    }

}