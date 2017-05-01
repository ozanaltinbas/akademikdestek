import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { AccountsService } from '../../../services/accounts.service';

import template from './recover.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'recover',
    template,
    styles: [ style ]
})
export class RecoverComponent implements OnInit {

    recoverForm: FormGroup;
    error: string = '';
    success: string = '';
    onProgress: boolean;

    // dependency injections
    constructor(private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize the form
        this.initializeRecoverForm();
        // redirect if user gets logged in
        this.accountsService.autoRedirect('login');
    }

    recover(): void {
        // initialize the error message
        this.error = '';
        // initialize the success message
        this.success = '';
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.recoverForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateRecoverForm(this.recoverForm);
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
                    usernameOrEmail: this.recoverForm.value.usernameOrEmail
                };
                // time to send reset password email link
                MeteorObservable.call('sendResetPasswordEmailLink', user).subscribe(() => {
                    // done. set as success.
                    this.success = this.accountsService.generateMessageText('success', 'reset-password-link-sent');
                    // initialize the form
                    this.initializeRecoverForm();
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

    initializeRecoverForm(): void {
        // initialize recover form
        this.recoverForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required]
        });
        // set on progress as false
        this.onProgress = false;
    }

}