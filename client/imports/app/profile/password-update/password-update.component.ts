import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentUser } from '../../../services/currentUser.service';
import { User } from '../../../../../both/models/user.model';
import { AccountsService } from '../../../services/accounts.service';
import { Accounts } from 'meteor/accounts-base';

import template from './password-update.component.html';
import style from './password-update.component.scss';

@Component({
    selector: 'password-update',
    template,
    styles: [ style ]
})
export class PasswordUpdateComponent implements OnInit, OnDestroy {

    error: string = '';
    success: string = '';
    passwordUpdateForm: FormGroup;
    user: User;

    constructor(private formBuilder: FormBuilder,
                private accountsService: AccountsService,
                private zone: NgZone) {}

    ngOnInit() {
        // get the logged in user data
        this.user = Meteor.user();
        // initialize passwor update form
        this.initializePasswordUpdateForm();
    }

    initializePasswordUpdateForm(): void {
        // initialize the form
        this.passwordUpdateForm = this.formBuilder.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            newPasswordAgain: ['', Validators.required],
        });
    }

    clearPasswordUpdateForm(): void {
        // initialize the form
        this.initializePasswordUpdateForm();
    }

    updatePassword() : void {
        // initialize error
        this.error = '';
        // initialize success
        this.success = '';
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.passwordUpdateForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validatePasswordUpdateForm(this.passwordUpdateForm);
            // if there is an error,
            if (serviceErrorMessage && serviceErrorMessage.length > 0) {
                // update the error message
                this.error = serviceErrorMessage;
                // stop going forward
                return;
            }
            // everyting seems ok. change it now.
            Accounts.changePassword(this.passwordUpdateForm.value.currentPassword, this.passwordUpdateForm.value.newPassword, (err) => {
                this.zone.run(() => {
                    if (err) {
                        // give specific error
                        if (err.reason === 'Incorrect password') {
                            // give current password incorrect password error message
                            this.error = this.accountsService.generateMessageText('error', 'current-user-Incorrect password');
                        } else {
                            console.log(err);
                        }
                    } else {
                        // print success message
                        this.success = this.accountsService.generateMessageText('success', 'password-change-success');
                        // initialize form
                        this.initializePasswordUpdateForm();
                    }
                });
            });
        } // if forms is invalid
        else {
            // all fields are required
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
        }
    }

    ngOnDestroy() {

    }

}