import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { AccountsService } from '../../../services/accounts.service';

import '../../../../../both/methods/user.methods.ts';

import template from './signup.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'signup',
    template,
    styles: [ style ]
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    error: string = '';
    success: string = '';
    onProgress: boolean;

    constructor(private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize the form
        this.initializeSignupForm();
        // redirect if user gets logged in
        this.accountsService.autoRedirect('login');
    }

    signup() : void {
        // initialize error
        this.error = '';
        // initialize the success message
        this.success = '';
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
            // if we are not progressing
            if (this.onProgress === false) {
                // set as on progress
                this.onProgress = true;
                // create the user object
                const user = {
                    username: this.signupForm.value.username,
                    email: this.signupForm.value.email,
                    firstname: this.signupForm.value.firstname,
                    lastname: this.signupForm.value.lastname,
                    password: this.signupForm.value.password
                };
                // time to create
                MeteorObservable.call('createNewUser', user).subscribe((response) => {
                    // if the user created successfully
                    if (response) {
                        // send verification e mail to the customer.
                        MeteorObservable.call('sendVerificationLink', response).subscribe(() => {});
                        // give user created message
                        this.success = this.accountsService.generateMessageText('success', 'user-created');
                        // initailze the form
                        this.initializeSignupForm();
                    }
                }, (err) => {
                    // print the error out
                    this.error = this.accountsService.generateMessageText('error', err.reason);
                    // set on progress as false
                    this.onProgress = false;
                });
            }
        } // form is not valid.
        else {
            // print the error out
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
            // set on progress as false
            this.onProgress = false;
        }
    }

    initializeSignupForm() : void {
        // initialize signup form
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            passwordAgain: ['', Validators.required]
        });
        // set on progress as false
        this.onProgress = false;
    }
}