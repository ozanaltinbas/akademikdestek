import { Component, OnInit, OnDestroy } from '@angular/core';
import { Roles } from 'meteor/alanning:roles';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from './profile.component.html';
import style from './profile.component.scss';

@Component({
    selector: 'profile',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class ProfileComponent implements OnInit, OnDestroy {
    
    constructor(private accountsService: AccountsService,
                private router: Router) {}

    ngOnInit() {
        // redirect if user gets logged off
        this.accountsService.autoRedirect('logout');
        // if the user logged in via service
        this.accountsService.isServiceLogged();
    }

    displayBlogEntry() : boolean {
        return Roles.userIsInRole(Meteor.userId(), 'admin');
    }

    ngOnDestroy() {

    }

}