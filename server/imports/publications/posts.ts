import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../both/models/options.model';

import { Posts } from '../../../both/collections/posts.collection';

Meteor.publishComposite('post-detail', function(postId: string) {
  return {
    find() {
      return Posts.find({ _id: postId, public: true });
    },
    children: [
      {
        find(post) {
          const options = { fields: { username: 1, profile: 1 }};
          return Meteor.users.find({ _id : post.owner }, options);
        }
      }
    ]
  };
});

Meteor.publishComposite('posts', function(options: Options, searchString: string) {

  let selector: any = {
    public : true
  };

  if (typeof searchString === 'string' && searchString.length) {
    selector.indexTitle = {
        $regex: `.*${searchString.replace(/ /g, '').toLowerCase()}.*`,
        $options : 'i'
      }
  }

  return {
    find() {
      Counts.publish(this, 'numberOfPosts', Posts.collection.find(selector), { noReady: true });
      return Posts.find(selector, options);
    },
    children: [
      {
        find(post) {
          const options = { fields: { username: 1, profile: 1 }};
          return Meteor.users.find({ _id : post.owner }, options);
        }
      }
    ]
  };
});