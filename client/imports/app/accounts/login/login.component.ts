import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
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
    error: string = '';
    onProgress: boolean;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize login form
        this.initializeLoginForm();
    }

    login(): void {
        // initialize error
        this.error = '';
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.loginForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateLoginForm(this.loginForm);
            // if there is an error,
            if (serviceErrorMessage && serviceErrorMessage.length > 0) {
                // update the error message
                this.error = serviceErrorMessage;
                // stop going forward
                return;
            }
            // if we are not progressing
            if (this.onProgress === false) {
                // set as on progress
                this.onProgress = true;
                // create the user object
                const user = {
                    usernameOrEmail: this.loginForm.value.usernameOrEmail,
                    password: this.loginForm.value.password
                };
                // time to login
                MeteorObservable.call('loginUserValidate', user).subscribe(() => {
                    // login now.
                    Meteor.loginWithPassword(user.usernameOrEmail, user.password, (err) => {
                        // if error occurs
                        if (err) {
                            // print it out
                            this.error = this.accountsService.generateMessageText('error', err.reason);
                            // set on progress as false
                            this.onProgress = false;
                        } else {
                            // redirect to blog page
                            this.router.navigate(['/blog']);
                        }
                    });
                }, (err) => {
                    // prints out the error message
                    this.error = this.accountsService.generateMessageText('error', err.reason);
                    // set on progress as false
                    this.onProgress = false;
                });
            }
        } // if form is not valid.
        else {
            // all fields are required
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
        }
    }

    initializeLoginForm() : void {
        // initialize login form
        this.loginForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required],
            password: ['', Validators.required]
        });
        // set on progress as false
        this.onProgress = false;
    }

}