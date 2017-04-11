import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    updateProfile: function (profileInfo: any) {
        // validate the user input
        check(profileInfo, {
            userId: String,
            firstname: String,
            lastname: String,
            email: String
        });
        // if we run on the server
        if (Meteor.isServer) {
            // validate if the user input is the same with current user.
            if (this.userId == profileInfo.userId) {
                // it is safe now.
                Meteor.users.update(
                    { _id: this.userId},
                    {$set: {
                        "profile.firstname": profileInfo.firstname,
                        "profile.lastname" : profileInfo.lastname,
                        "emails[0].address": profileInfo.email}});
                // updated.
            } else {
                throw new Meteor.Exception("not-a-current-user", "You cannot update this profile.");
            }
        }
    }
});