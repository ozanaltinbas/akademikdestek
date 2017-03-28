import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
                private zone: NgZone,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            passwordAgain: ['', Validators.required]
        });

        this.error = '';
    }

    ngAfterViewInit() {

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
                this.zone.run(() => {
                    // update the error message
                    this.error = serviceErrorMessage;
                });
                // stop going forward
                return;
            }
            // create the user
            Accounts.createUser({
                email: this.signupForm.value.email,
                password: this.signupForm.value.password
            }, (err) => {
                if (err) {
                    this.zone.run(() => {
                        console.log(err);
                        this.error = "ACCOUNTS.ERROR." + err.reason;
                    });
                } else {
                    this.router.navigate(['/blog']);
                }
            });
        } else {
            this.zone.run(() => {
                this.error = "ACCOUNTS.ERROR.all_fields_required";
            });
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