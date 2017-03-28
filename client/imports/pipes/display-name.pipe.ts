import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { User } from '../../../both/models/user.model';

@Pipe({
  name: 'displayName'
})
export class DisplayNamePipe implements PipeTransform {
  transform(userId: string): string {

    if (!userId) {
      return '';
    }

    let user = Meteor.users.findOne(userId);

    if (!user) {
      return '';
    }

    if (user.username) {
      return user.username;
    }

    if (user.emails) {
      return user.emails[0].address;
    }

    return '';
  }
}
