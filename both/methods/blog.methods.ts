import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Blog } from '../models/blog.model';
import { Blogs } from '../collections/blogs.collection';

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
    }
});