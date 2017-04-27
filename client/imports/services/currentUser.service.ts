import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrentUser {

    isCurrentUser(userId: string) : boolean {
        // if there is a userId input filled,
        if (userId && userId.length > 0) {
            // there is an incoming userId
            return Meteor.userId() && Meteor.userId() === userId;
        }
        // default false;
        return false;
    }
    
}