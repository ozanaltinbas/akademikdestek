import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../both/models/options.model';

import { PostComments } from '../../../both/collections/post-comments.collection';

Meteor.publish('post-comments', function(postId: string, options: Options) {
    Counts.publish(this, 'numberOfPostComments', PostComments.collection.find({ postId: postId, public: true }), { noReady: true });
    return PostComments.find({ postId: postId, public: true }, options);
});