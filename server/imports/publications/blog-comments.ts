import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Options } from '../../../both/models/options.model';

import { BlogComments } from '../../../both/collections/blog-comments.collection';

Meteor.publishComposite('blog-comments', function(blogId: string, options: Options) {
    return {
        find() {
            Counts.publish(this, 'numberOfBlogComments', BlogComments.collection.find({ blogId: blogId, public: true }), { noReady: true });
            return BlogComments.find({ blogId: blogId, public: true }, options);
        },
        children: [
            {
                find(blogComment) {
                    const options = { fields: { username: 1 }};
                    return Meteor.users.find({ _id : blogComment.owner }, options);
                }
            }
        ]
    };

});