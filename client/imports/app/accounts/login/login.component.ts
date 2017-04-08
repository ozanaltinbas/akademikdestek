import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { AccountsService } from '../../../services/accounts.service';

import template from './login.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'login',
    template,
    styles: [ style ]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string;

    constructor(private router: Router,
                private zone: NgZone,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
    }

    login() {
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.loginForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateLoginForm(this.loginForm);
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
            Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
                this.zone.run(() => {
                    if (err) {
                        console.log(err);
                        this.error = "ACCOUNTS.ERROR." + err.reason;
                    } else {
                        this.router.navigate(['/blog']);
                    }
                });
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