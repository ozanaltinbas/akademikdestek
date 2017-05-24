import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../both/models/options.model';

import { PostComments } from '../../../both/collections/post-comments.collection';

Meteor.publishComposite('post-comments', function(postId: string, options: Options, searchString: string) {

    let selector: any = {
        postId: postId,
        public : true
    };

    if (typeof searchString === 'string' && searchString.length) {
        selector.indexContent = {
            $regex: `.*${searchString.replace(/ /g, '').toLowerCase()}.*`,
            $options : 'i'
        }
    }

    return {
        find() {
            Counts.publish(this, 'numberOfPostComments', PostComments.collection.find(selector), { noReady: true });
            return PostComments.find(selector, options);
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