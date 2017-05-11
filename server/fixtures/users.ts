import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

export function loadUsers() {
    if (Meteor.users.find({}).count() === 0) {
        const users: any[] = [{
            username: 'ozanaltinbas',
            email: 'ozan.altinbas@ymail.com',
            profile: {
                firstname: 'Ozan',
                lastname: 'Altınbaş',
                gender: 'M',
                url: ''
            },
            password: 'OZan54335433',
            public: true
        }];
        users.forEach(createAdminUsers);
    }
}

function createAdminUsers(user) {
    if (user) {
        let userId = Accounts.createUser(user);
        Meteor.users.update(userId,
            { $set: { "emails.0.verified": true}}
        );
        Roles.addUsersToRoles( userId, [ 'admin', 'user' ] );
    }
}