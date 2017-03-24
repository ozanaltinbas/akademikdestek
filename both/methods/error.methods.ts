import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Error } from '../models/error.model';
import { Errors } from '../collections/errors.collection';

Meteor.methods({
    insertError: function (error: string, reason: string, details: string, owner: string) {

        check(error, String);
        check(reason, Match.Maybe(String));
        check(details, Match.Maybe(String));
        check(owner, String);

        if (Meteor.isServer) {

            let error: Error = {
                "error": error,
                "reason": reason,
                "details": details,
                "owner": owner,
                "createdAt": new Date()
            };
            
            Errors.insert(error);
        }
    }
});