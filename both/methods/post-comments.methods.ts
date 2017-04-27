import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { PostComment } from '../models/post-comment.model';
import { PostComments } from '../collections/post-comments.collection';

Meteor.methods({
    /** inserts a new post comment */
    insertPostComment: function (postId: string, content: string, owner: string) {
        // validate user inputs
        check(postId, String);
        check(content, String);
        check(owner, String);
        // everything seems OK.
        // if logged in user is the current one
        if (this.userId == owner) {
            // change action to server
            if (Meteor.isServer) {
                // initialize postComment object
                let postComment: PostComment = {
                    "postId": postId,
                    "content": content,
                    "owner": owner,
                    "public": true,
                    "createdAt": new Date()
                };
                // then insert it
                PostComments.insert(postComment);
            }
        }
    },
    /** deletes a current post comment */
    deletePostComment: function (postCommentId: string, owner: string) {
        // validate input values
        check(postCommentId, String);
        check(owner, String);
        // everything seems OK. if current user tries to insert a new comment
        if (this.userId == owner) {
            // get the blog comment
            let postComment = PostComments.findOne({ _id : postCommentId, owner : owner });
            // if found
            if (postComment) {
                // delete it
                // change action to server
                if (Meteor.isServer) {
                    // delete it
                    PostComments.remove(postCommentId);
                }
            }
        }
    }
});