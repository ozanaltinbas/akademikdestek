import { Meteor } from 'meteor/meteor';

import { Blogs } from '../../../both/collections/blogs.collection';

Meteor.publish('blogs', function() {
  return Blogs.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('blog-detail', function(blogId: string) {
  return Blogs.find({ _id: blogId, public: true });
});