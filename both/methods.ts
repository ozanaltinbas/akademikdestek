import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    sendMail: function (email: string, subject: string, message: string) {
        check(email, String);
        check(subject, String);
        check(message, String);

        if (Meteor.isServer) {
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