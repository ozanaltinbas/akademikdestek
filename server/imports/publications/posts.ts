import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Posts } from '../../../both/collections/posts.collection';

interface Options {
  [key: string]: any;
}

Meteor.publishComposite('post-detail', function(postId: string) {
  return {
    find() {
      return Posts.find({ _id: postId, public: true });
    },
    children: [
      {
        find(post) {
          const options = { fields: { username: 1 }};
          return Meteor.users.find({ _id : post.owner }, options);
        }
      }
    ]
  };
});

Meteor.publishComposite('posts', function(options: Options) {
  return {
    find() {
      Counts.publish(this, 'numberOfPosts', Posts.collection.find({ public : true }), { noReady: true });
      return Posts.find({ public : true }, options);
    },
    children: [
      {
        find(post) {
          const options = { fields: { username: 1 }};
          return Meteor.users.find({ _id : post.owner });
        }
      }
    ]
  };
});