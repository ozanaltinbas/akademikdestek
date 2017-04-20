import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import template from './social-login.component.html';
import style from '../../accounts.scss';

@Component({
    selector: 'social-login',
    template,
    styles: [ style ]
})
export class SocialLoginComponent {

    constructor() {}

    loginWithFacebook() : void {
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }
        });
    }

    loginWithTwitter() : void {
        Meteor.loginWithTwitter({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }
        });
    }

    loginWithGoogle() : void {
        Meteor.loginWithGoogle();
    }

}