import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Blogs } from '../../../both/collections/blogs.collection';

interface Options {
  [key: string]: any;
}

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

Meteor.publishComposite('blogs', function(options: Options) {
  return {
    find() {
      Counts.publish(this, 'numberOfBlogs', Blogs.collection.find({ public : true }), { noReady: true });
      return Blogs.find({ public : true }, options);
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