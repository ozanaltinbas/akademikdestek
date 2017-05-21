import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../both/models/options.model';

import { PostComments } from '../../../both/collections/post-comments.collection';

Meteor.publishComposite('post-comments', function(postId: string, options: Options) {
    return {
        find() {
            Counts.publish(this, 'numberOfPostComments', PostComments.collection.find({ postId: postId, public: true }), { noReady: true });
            return PostComments.find({ postId: postId, public: true }, options);
        },
        children: [
            {
                find(postComment) {
                    const options = { fields: { username: 1 }};
                    return Meteor.users.find({ _id : postComment.owner }, options);
                }
            }
        ]
    };

});