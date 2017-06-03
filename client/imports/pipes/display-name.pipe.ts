import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {
  transform(userId: string): string {
    if (!userId) {
      return '';
    }

    let user = Meteor.users.findOne({ _id : userId }, { fields: { username:1, profile: 1 } });

    if (!user) {
      return '';
    }

    if (user.username) {
      return user.username;
    }

    if (user.profile.name) {
      return user.profile.name;
    }

    if (user.emails) {
      return user.emails[0].address;
    }

    if (user.services) {
      if (user.services.twitter) {
        return user.services.twitter.screenName;
      }
      if (user.services.facebook) {
        return user.services.facebook.name;
      }
      if (user.services.google) {
        return user.services.google.screenName;
      }
    }

    return '';
  }

}
