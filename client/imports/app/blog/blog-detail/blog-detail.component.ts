import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Blogs } from '../../../../../both/collections/blogs.collection';
import { Blog } from '../../../../../both/models/blog.model';

import template from './blog-detail.component.html';
import style from './blog-detail.component.scss';

@Component({
    selector: 'blog-detail',
    template,
    styles: [ style ]
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    blogId: string;
    paramsSub: Subscription;
    blog: Blog;
    blogSub: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['blogId'])
            .subscribe(blogId => {
                this.blogId = blogId;

                if (this.blogSub) {
                    this.blogSub.unsubscribe();
                }

                this.blogSub = MeteorObservable.subscribe('blog-detail', this.blogId).subscribe(() => {
                    MeteorObservable.autorun().subscribe(() => {
                        this.blog = Blogs.findOne(this.blogId);
                    });
                });
            });
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.blogSub.unsubscribe();
    }

}