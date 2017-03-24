import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Log } from '../models/log.model';
import { Logs } from '../collections/logs.collection';

Meteor.methods({
    insertLog: function (type: string, detail: string, owner: string) {

        check(type, String);
        check(detail, String);
        check(owner, String);

        if (Meteor.isServer) {
            let log: Log = {
                "type": type,
                "detail": detail,
                "owner": owner,
                "createdAt": new Date()
            };
            Logs.insert(log);
        }
    }
});