import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

Meteor.methods({
    createNewUser: function (user: any) {
        // validate the user input
        check(user, {
            username: String,
            firstname: String,
            lastname: String,
            email: String,
            password: String
        });
        // inputs seems ok for now.
        if (Meteor.isServer) {
            // we are now on server. Create the user. Create the user
            let userId = Accounts.createUser({
                username: user.username,
                email: user.email,
                password: user.password,
                profile: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    url: '',
                    gender: '',
                    imageUrl: ''
                }
            });
            // this is user right ?
            Roles.addUsersToRoles( userId, [ 'user' ] );
            // then return userId
            return userId;
        }
    },
    sendVerificationLink(userId) {
        // validate the userId
        check(userId, String);
        // send a verification link to the user.
        Accounts.sendVerificationEmail(userId);
    },
    loginUserValidate: function (user: any) {
        // validate the user input
        check(user, {
            usernameOrEmail: String,
            password: String
        });
        // on server code
        if (Meteor.isServer) {
            // get the current user. we need to validate if its mail address is verified or not.
            let userObject: any = Accounts.findUserByUsername(user.usernameOrEmail);
            // if user found.
            if (!userObject) {
                // try to find it by email
                userObject = Accounts.findUserByEmail(user.usernameOrEmail);
            }
            // if user found
            if (userObject) {
                // check email verification
                if(!userObject.emails[0].verified) {
                    // throw error
                    throw new Meteor.Error("email-not-verified", "email-not-verified");
                }
            }
        }
    },
    sendVerificationEmailLink: function (user) {
        // check input
        check(user, {
            usernameOrEmail: String
        });
        // if email is filled
        if (user.usernameOrEmail && user.usernameOrEmail.length > 0) {
            // convert action to server
            if (Meteor.isServer) {
                // get the current user. we need to validate if its mail address is verified or not.
                let userObject: any = Accounts.findUserByUsername(user.usernameOrEmail);
                // if user found.
                if (!userObject) {
                    // try to find it by email
                    userObject = Accounts.findUserByEmail(user.usernameOrEmail);
                }
                // if user found
                if (userObject) {
                    // check email verification
                    if(!userObject.emails[0].verified) {
                        // send a verification link to the user.
                        Accounts.sendVerificationEmail(userObject._id);
                    } else {
                        // it is already verified
                        throw new Meteor.Error("email-verified", "email-verified");
                    }
                } else {
                    // not a user
                    throw new Meteor.Error("not-a-user", "not-a-user");
                }
            }
        }
    },
    sendResetPasswordEmailLink: function (user) {
        // check input
        check(user, {
            usernameOrEmail: String
        });
        // if email is filled
        if (user.usernameOrEmail && user.usernameOrEmail.length > 0) {
            // convert action to server
            if (Meteor.isServer) {
                // get the current user. we need to validate if its mail address is verified or not.
                let userObject: any = Accounts.findUserByUsername(user.usernameOrEmail);
                // if user found.
                if (!userObject) {
                    // try to find it by email
                    userObject = Accounts.findUserByEmail(user.usernameOrEmail);
                }
                // if user found
                if (userObject) {
                    // send reset password link
                    Accounts.sendResetPasswordEmail(userObject._id);
                } else {
                    // not a user
                    throw new Meteor.Error("not-a-user", "not-a-user");
                }
            }
        }
    },
    updateProfile: function (profileInfo: any) {
        // validate the user input
        check(profileInfo, {
            userId: String,
            firstname: String,
            lastname: String,
            email: String,
            gender: Match.Optional(String)
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
                        "profile.gender" : profileInfo.gender,
                        "emails[0].address": profileInfo.email}});
                // updated.
            } else {
                throw new Meteor.Error("not-a-current-user", "You cannot update this profile.");
            }
        }
    },
    updateProfileImageId: function (userId: string, imageId: string) {
        // validate the user input
        check(userId, String);
        check(imageId, String);
        // if we run on the server
        if (Meteor.isServer) {
            // validate if the user input is the same with current user.
            if (this.userId == userId) {
                // it is safe now.
                Meteor.users.update(
                    { _id: this.userId},
                    {$set: {
                        "profile.imageId": imageId
                    }});
                // updated.
            } else {
                throw new Meteor.Error("not-a-current-user", "You cannot update this profile.");
            }
        }
    }
});