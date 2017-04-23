import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Post } from '../models/post.model';
import { Posts } from '../collections/posts.collection';

Meteor.methods({
    insertPost: function (post: any) {
        // validate user inputs
        check(post, {
            title : post.title,
            content : post.content,
            owner : post.owner
        });
        // if it is current user
        if (this.userId == post.owner) {
            // convert action to server
            if (Meteor.isServer) {
                // create the post object
                let postObject: Post = {
                    'title' : post.title,
                    'content': post.content,
                    'owner': post.owner,
                    'public': true,
                    'createdAt': new Date()
                }
                // insert it
                Posts.insert(postObject);
            }
        }
    },
    deletePost: function (postId: string, user: string) {
        // validate user inputs
        check(postId, String);
        check(user, String);
        // if it is current user
        if (this.userId == user) {
            // convert action to server
            if (Meteor.isServer) {
                // delete it
                Posts.remove(postId);
            }
        }
    }
});