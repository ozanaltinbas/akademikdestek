import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    sendMail: function (email: string, subject: string, message: string) {
        // validate mail inputs
        check(email, String);
        check(subject, String);
        check(message, String);
        // change action to server
        if (Meteor.isServer) {
            // send the email now!
            Email.send({
                from: email,
                to: 'academikdestek@gmail.com',
                replyTo: email,
                subject: subject,
                text: message
            });
        }
    }
});