import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Blogs } from '../../../../both/collections/blogs.collection';
import { Blog } from '../../../../both/models/blog.model';

import template from './blog.component.html';
import style from './blog.component.scss';

@Component({
    selector: 'blog',
    template,
    styles: [ style ]
})
export class BlogComponent implements OnInit, OnDestroy {

    blogs: Observable<Blog[]>;
    blogsSub: Subscription;

    constructor() {

    }

    ngOnInit() {
        if (this.blogsSub) {
            this.blogsSub.unsubscribe();
        }

        this.blogsSub = MeteorObservable.subscribe('blogs').subscribe(() => {
            this.blogs = Blogs.find({}, {
                sort: {
                    createdAt: 1
                }
            }).zone();
        });
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy() {
        this.blogsSub.unsubscribe();
    }

}