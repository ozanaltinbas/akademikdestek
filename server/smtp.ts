import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    
    let smtp = {
        port: 587,
        username: 'academikdestek@gmail.com',
        password: '1244244Ha',
        server:   'smtp.gmail.com'
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});