import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class LoggedOutGuard implements CanActivate {

    canActivate(): boolean {
        // if the user is logged in
        if (Meteor.userId() && Meteor.userId().length > 0) {
            // user is logged in. don't allow it.
            return false;
        }
        // return false on default
        return true;
    }
}