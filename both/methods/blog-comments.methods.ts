import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { BlogComment } from '../models/blog-comment.model';
import { BlogComments } from '../collections/blog-comments.collection';

Meteor.methods({
    insertBlogComment: function (blogId: string, content: string, owner: string) {

        check(blogId, String);
        check(content, String);
        check(owner, String);

        if (this.userId == owner) {
            if (Meteor.isServer) {

                let blogComment: BlogComment = {
                    "blogId": blogId,
                    "content": content,
                    "owner": owner,
                    "public": true,
                    "createdAt": new Date()
                };
                BlogComments.insert(blogComment);
            }
        }
    }
});