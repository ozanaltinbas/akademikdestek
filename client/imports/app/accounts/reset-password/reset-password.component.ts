import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accounts } from 'meteor/accounts-base';
import { Subscription } from 'rxjs/Subscription';
import { AccountsService } from '../../../services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';

import '../../../../../both/methods/user.methods.ts';

import template from './reset-password.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'reset-password',
    template,
    styles: [ style ]
})
export class ResetPasswordComponent implements OnInit {

    paramsSub: Subscription;
    resetPasswordForm: FormGroup;
    error: string;
    onProgress: boolean;

    // dependency injections
    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // initialize the form
        this.initializeResetPasswordForm();
        // redirect if user gets logged in
        this.accountsService.autoRedirect('login');
    }

    resetPassword(): void {
        // initialize the error message
        this.error = '';
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.resetPasswordForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateResetPasswordForm(this.resetPasswordForm);
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
                // get the incoming params.
                this.paramsSub = this.route.params
                    .map(params => params['token'])
                    .subscribe(token => {
                        // time to reset password
                        Accounts.resetPassword(token, this.resetPasswordForm.value.password, (err) => {
                            // if there is an error
                            if (err) {
                                // if there is too many request
                                if (err.error === 'too-many-requests') {
                                    // give the proper message to the user.
                                    this.error = this.accountsService.generateMessageText('error', err.error);
                                } // otherwise,
                                else {
                                    // print it out
                                    this.error = this.accountsService.generateMessageText('error', err.reason);
                                }
                                // set onProgress as false
                                this.onProgress = false;
                            } // if successfully completed
                            else {
                                // done. redirect to blog page.
                                this.router.navigate(['/blog']);
                            }
                        });
                    });
            }
        } // form is not valid.
        else {
            // print error message out
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
        }
    }

    initializeResetPasswordForm(): void {
        // initialize resetPasswordForm form
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            passwordValidate: ['', Validators.required]
        });
        // initialize error message.
        this.error = '';
        // set on progress as false
        this.onProgress = false;
    }

}