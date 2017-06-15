import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { PostComment } from '../models/post-comment.model';
import { PostComments } from '../collections/post-comments.collection';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
    /** inserts a new post comment */
    insertPostComment: function (postId: string, content: string, owner: string) {
        // validate user inputs
        check(postId, String);
        check(content, String);
        check(owner, String);
        // everything seems OK.
        // change action to server
        if (Meteor.isServer) {
            // if logged in user is the current one.
            if (this.userId == owner) {
                // initialize postComment object
                let postComment: PostComment = {
                    "postId": postId,
                    "content": content,
                    'indexContent' : content.replace(/ /g, '').toLowerCase(),
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
        // change action to server
        if (Meteor.isServer) {
            // everything seems OK. if current user tries to insert a new comment
            if (this.userId == owner) {
                // get the blog comment
                let postComment = PostComments.findOne({_id: postCommentId, owner: owner});
                // if found
                if (postComment) {
                    // delete it
                    PostComments.remove(postCommentId);
                }
            }
        }
    },
    setPostCommentPrivate: function (postCommentId: string, user: string) {
        // validate user inputs
        check(postCommentId, String);
        check(user, String);
        // change action to server
        if (Meteor.isServer) {
            // if it is current user
            if (this.userId == user) {
                // convert action to serve. if the user is an admin
                if (Roles.userIsInRole(user, ['admin'])) {
                    // Thats it. Post can be set as private
                    PostComments.update(postCommentId, { set: { public : false } })
                }
            }
        }
    }
});