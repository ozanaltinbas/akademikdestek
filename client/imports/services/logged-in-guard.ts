import { Meteor } from 'meteor/meteor';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(): boolean {
        // if the user is logged in
        if (Meteor.userId() && Meteor.userId().length > 0) {
            // user is logged in. allow it.
            return true;
        }
        // user is not logged in. redirect to login page
        this._router.navigate(['/login']);
        // return false on default
        return false;
    }
}