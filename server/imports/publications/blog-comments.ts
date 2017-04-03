import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { BlogComments } from '../../../both/collections/blog-comments.collection';

interface Options {
    [key: string]: any;
}

Meteor.publish('blog-comments', function(blogId: string, options: Options) {
    Counts.publish(this, 'numberOfBlogComments', BlogComments.collection.find({ blogId: blogId, public: true }), { noReady: true });
    return BlogComments.find({ blogId: blogId, public: true }, options);
});