import { Meteor } from 'meteor/meteor';
import { Component } from '@angular/core';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from './posts.component.html';
import style from './posts.component.scss';

@Component({
    selector: 'posts',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class PostsComponent {

    user: Meteor.User;

    constructor() {

    }

}