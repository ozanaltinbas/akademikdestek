import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { PaginationService } from 'ng2-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../../../both/models/options.model';
import { CurrentUser } from '../../../services/currentUser.service';

import 'rxjs/add/operator/combineLatest';
import '../../../../../both/methods/post.methods.ts';

import { Post } from '../../../../../both/models/post.model';
import { Posts } from '../../../../../both/collections/posts.collection';

import template from './posts-list.component.html';
import style from './posts-list.component.scss';
import style_posts from '../posts.component.scss';

@Component({
    selector: 'posts-list',
    template,
    styles: [ style, style_posts ]
})
export class PostsListComponent implements OnInit, OnDestroy {

    posts: Observable<Post[]>;
    postsSub: Subscription;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    optionsSub: Subscription;
    postsSize: number = 0;
    autorunSub: Subscription;

    constructor(private paginationService: PaginationService,
                private currentUser: CurrentUser) {}

    ngOnInit() {
        // if combineLatest exists
        if (this.optionsSub) {
            // unsubscribe it
            this.optionsSub.unsubscribe();
        }
        // combine latest for options subscription
        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage
        ).subscribe(([pageSize, curPage]) => {
            // create the options object
            const options: Options = {
                limit: pageSize as number,
                skip: ((curPage as number) - 1) * (pageSize as number),
                sort: { createdAt: -1 }
            };
            // set current page
            this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);
            // if posts still subscribed
            if (this.postsSub) {
                // unsubscribe it
                this.postsSub.unsubscribe();
            }
            // done. subscribe the posts now.
            this.postsSub = MeteorObservable.subscribe('posts', options).subscribe(() => {
                // get all posts which is public
                this.posts = Posts.find({
                    public : true
                }, {
                    sort: {
                        // order by createdAt desc
                        createdAt: -1
                    }
                }).zone();
            });
        });
        // build pagination service
        this.paginationService.register({
            id: this.paginationService.defaultId(),
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.postsSize
        });
        // initialize settings
        this.pageSize.next(10);
        this.curPage.next(1);
        // unsubscribe autorun if it exists
        if (this.autorunSub) {
            // unsubscribing
            this.autorunSub.unsubscribe();
        }
        // build subscrption again
        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            // assign values
            this.postsSize = Counts.get('numberOfPosts');
            this.paginationService.setTotalItems(this.paginationService.defaultId(), this.postsSize);
        });
    }

    onPageChanged(page: number): void {
        // set current page
        this.curPage.next(page);
    }

    deletePost(post: Post): void {
        // if there is a post to be deleted
        if (post) {
            // delete it
            MeteorObservable.call('deletePost', post._id, post.owner).subscribe(() => {

            }, (err) => {

            });
        }
    }

    isCurrentUser(owner: string) {
        return this.currentUser.isCurrentUser(owner);
    }

    ngOnDestroy() {
        // destroy all subscriptions
        this.postsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

}