import { Meteor } from 'meteor/meteor';

import { Users } from '../../../both/collections/users.collection';

Meteor.publish("users", function () {
    return Users.find({}, { fields: { profile: 1 } });
});

Meteor.publish("user", function (userId:string) {
    return Users.find({ _id : userId }, { fields: { profile: 1 } });
});