import { Meteor } from 'meteor/meteor';

import { Blogs } from '../../../both/collections/blogs.collection';

Meteor.publishComposite('blog-detail', function(blogId: string) {
  return {
    find() {
      return Blogs.find({ _id: blogId, public: true });
    },
    children: [
      {
        find(blog) {
          const options = { fields: { username: 1 }};
          return Meteor.users.find({ _id : blog.owner }, options);
        }
      }
    ]
  };
});

Meteor.publishComposite('blogs', function() {
  return {
    find() {
      return Blogs.find({ public : true }, {sort: {createdAt: 1}});
    },
    children: [
      {
        find(blog) {
          const options = { fields: { username: 1 }};
          return Meteor.users.find({ _id : blog.owner }, options);
        }
      }
    ]
  };
});