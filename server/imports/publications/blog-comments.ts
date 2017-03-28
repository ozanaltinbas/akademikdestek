import { Meteor } from 'meteor/meteor';

import { BlogComments } from '../../../both/collections/blog-comments.collection';

Meteor.publish('blog-comments', function(blogId: string) {
    return BlogComments.find({ blogId: blogId, public: true }, {sort: {createdAt: -1}});
});