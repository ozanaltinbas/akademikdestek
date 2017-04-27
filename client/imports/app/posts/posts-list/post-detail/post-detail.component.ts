import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";

import 'rxjs/add/operator/map';

import { Posts } from '../../../../../../both/collections/posts.collection';
import { Post } from '../../../../../../both/models/post.model';

import template from './post-detail.component.html';
import style from './post-detail.component.scss';
import style_post from '../../posts.component.scss';

@Component({
    selector: 'post-detail',
    template,
    styles: [ style, style_post ]
})
@InjectUser('user')
export class PostDetailComponent implements OnInit, OnDestroy {

    postId: string;
    paramsSub: Subscription;
    post: Post;
    postSub: Subscription;
    user: Meteor.User;

    constructor(private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['postId'])
            .subscribe(postId => {
                this.postId = postId;
                this.post = Posts.findOne(this.postId);
                if (!this.post) {
                    this.router.navigate(['/posts']);
                }

                this.postSub = MeteorObservable.subscribe('post-detail', this.postId).subscribe(() => {
                    MeteorObservable.autorun().subscribe(() => {
                        this.post = Posts.findOne(this.postId);
                    });
                });
            });
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.postSub.unsubscribe();
    }

}