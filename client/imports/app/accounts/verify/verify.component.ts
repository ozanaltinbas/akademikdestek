import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { AccountsService } from '../../../services/accounts.service';

import '../../../../../both/methods/user.methods.ts';

import template from './verify.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'verify',
    template,
    styles: [ style ]
})
export class VerifyComponent implements OnInit {

    verifyEmailForm: FormGroup;
    error: string = '';
    success: string = '';
    onProgress: boolean;

    constructor(private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize the form
        this.initializeVerifyEmailForm();
        // redirect if user gets logged in
        this.accountsService.autoRedirect('login');
    }

    verifyEmail(): void {
        // initialize the error message
        this.error = '';
        // initialize the success message
        this.success = '';
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.verifyEmailForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateVerifyEmailForm(this.verifyEmailForm);
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
                    usernameOrEmail: this.verifyEmailForm.value.usernameOrEmail
                };
                // time to login
                MeteorObservable.call('sendVerificationEmailLink', user).subscribe(() => {
                    // done. set as success.
                    this.success = this.accountsService.generateMessageText('success', 'verify-link-sent');
                    // initialize the form
                    this.initializeVerifyEmailForm();
                }, (err) => {
                    // error occured. print it out.
                    this.error = this.accountsService.generateMessageText('error', err.reason);
                    // set as on progress false.
                    this.onProgress = false;
                });
            }
        } // form is not valid.
        else {
            // print error message out
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
        }
    }

    initializeVerifyEmailForm(): void {
        // initialize verify1 email form
        this.verifyEmailForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required]
        });
        // set on progress as false
        this.onProgress = false;
    }

}