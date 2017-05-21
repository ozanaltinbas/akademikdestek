import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Blog } from '../models/blog.model';
import { Blogs } from '../collections/blogs.collection';
import { BlogComments } from '../collections/blog-comments.collection';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
    insertBlog: function (title: string, subtitle: string, content: string, owner: string) {
        check(title, String);
        check(subtitle, String);
        check(content, String);
        check(owner, String);

        if (this.userId == owner) {
            if (Meteor.isServer) {

                let blog: Blog = {
                    "title" : title,
                    "subtitle": subtitle,
                    "content": content,
                    "owner": owner,
                    "public": true,
                    "createdAt": new Date()
                }
                Blogs.insert(blog);
            }
        }
    },
    deleteBlog: function (blogId: string, user: string) {
        // validate user inputs
        check(blogId, String);
        check(user, String);
        // if it is current user
        if (this.userId == user) {
            // convert action to server
            if (Meteor.isServer) {
                // delete it
                Blogs.remove(blogId);
                // also delete related post comments
                BlogComments.remove({ blogId : blogId });
            }
        }
    },
});