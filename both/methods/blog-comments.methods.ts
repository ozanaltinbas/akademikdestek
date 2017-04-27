import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { BlogComment } from '../models/blog-comment.model';
import { BlogComments } from '../collections/blog-comments.collection';

Meteor.methods({
    /** inserts a new blog comment */
    insertBlogComment: function (blogId: string, content: string, owner: string) {
        // validade input values
        check(blogId, String);
        check(content, String);
        check(owner, String);
        // everything seems OK. if current user tries to insert a new comment
        if (this.userId == owner) {
            // change action to server
            if (Meteor.isServer) {
                // create blogComment object to be inserted
                let blogComment: BlogComment = {
                    'blogId': blogId,
                    'content': content,
                    'owner': owner,
                    'public': true,
                    'createdAt': new Date()
                };
                // insert new comment
                BlogComments.insert(blogComment);
            }
        }
    },
    /** deletes a current blog comment */
    deleteBlogComment: function (blogCommentId: string, owner: string) {
        // validate input values
        check(blogCommentId, String);
        check(owner, String);
        // everything seems OK. if current user tries to insert a new comment
        if (this.userId == owner) {
            // get the blog comment
            let blogComment = BlogComments.findOne({ _id : blogCommentId, owner : owner });
            // if found
            if (blogComment) {
                // delete it
                BlogComments.remove(blogCommentId);
            }
        }
    }
});