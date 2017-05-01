import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

export const Users = MongoObservable.fromExisting(Meteor.users);

function allow() {
    return false;
}

Users.allow({
    insert: allow,
    update: allow,
    remove: allow
});