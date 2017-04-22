import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Roles } from 'meteor/alanning:roles';

import template from './profile.component.html';
import style from './profile.component.scss';

@Component({
    selector: 'profile',
    template,
    styles: [ style ]
})
export class ProfileComponent implements OnInit{

    constructor(private accountsService: AccountsService) {

    }

    ngOnInit() {

    }

    displayBlogEntry() : boolean {
        return Roles.userIsInRole(Meteor.userId(), 'admin');
    }
    
}