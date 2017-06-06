import { Accounts } from 'meteor/accounts-base'

export function accountsConfig() : void {
    // Generate user initials after Facebook login
    Accounts.onCreateUser((options, user) => {
        user.profile = {};
        // if we login via facebook
        if (user.services.facebook) {
            // assign imageUrl
            user.profile.imageUrl = 'https://graph.facebook.com/' + user.services.facebook.id + '/picture?type=normal';
            user.profile.name = user.services.facebook.name;
        } // if we login via twitter
        else if (user.services.twitter) {
            // assign imageUrl
            user.profile.imageUrl = user.services.twitter.profile_image_url_https;
            user.profile.name = user.services.twitter.screenName;
        } // if we login via instagram
        else if (user.services.instagram) {
            // assign imageUrl
            user.profile.imageUrl = user.services.instagram.profile_picture;
            user.profile.name = user.services.instagram.username;
        }
        // Don't forget to return the new user object at the end!
        return user;
    });
}