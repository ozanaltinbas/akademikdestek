import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { AccountsService } from '../../../services/accounts.service';

import template from './signup.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'signup',
    template,
    styles: [ style ]
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    error: string;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize the form
        this.initializeSignupForm();
    }

    initializeSignupForm(): void {
        // initialize signup form
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordAgain: ['', Validators.required]
        });
        // also initialize the error message given
        this.error = '';
    }

    signup() : void {
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.signupForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateSignupForm(this.signupForm);
            // if there is an error,
            if (serviceErrorMessage && serviceErrorMessage.length > 0) {
                // lets update the error message
                this.error = serviceErrorMessage;
                // stop going forward
                return;
            }
            // create the user object
            const user = {
                username: this.signupForm.value.username,
                email: this.signupForm.value.email,
                password: this.signupForm.value.password
            };
            // time to create
            MeteorObservable.call('createNewUser', user).subscribe(() => {
                this.router.navigate(['/blog']);
            }, (err) => {
                this.error = "ACCOUNTS.ERROR." + err.reason;
            });
        } // form is not valid.
        else {
            this.error = "ACCOUNTS.ERROR.all_fields_required";
        }
    }

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