import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { User } from '../../../../../both/models/user.model';

import template from './profile-update.component.html';
import style from './profile-update.component.scss';

@Component({
    selector: 'profile-update',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class ProfileUpdateComponent implements OnInit {

    profileUpdateForm: FormGroup;
    currentUser: User = this.user;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.initializeFormData();
    }

    initializeFormData(): void {
        // initialize the form
        this.profileUpdateForm = this.formBuilder.group({
            firstname: [this.currentUser.profile.firstname, Validators.required],
            lastname: [this.currentUser.profile.lastname, Validators.required],
            email: [this.currentUser.emails[0].address, Validators.required]
        });
    }

    updateProfile(): void {
        // if our form is valid.
        if (this.profileUpdateForm.valid) {
            // our form is valid.
            const profileInfo = {
                'userId': this.currentUser._id,
                'firstname': this.profileUpdateForm.value.firstname,
                'lastname': this.profileUpdateForm.value.lastname,
                'email': this.profileUpdateForm.value.email
            };
            // update the user profile.
            MeteorObservable.call('updateProfile', profileInfo).subscribe(() => {
                    $('#profile-update-success').modal();
                }, (error) => {
                    $('#profile-update-fail').modal();
                    console.log(error);
            });
        }
    }
}