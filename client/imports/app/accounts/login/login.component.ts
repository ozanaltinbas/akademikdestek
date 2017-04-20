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
    error: string;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usernameOrEmail: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
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
                        this.error = "ACCOUNTS.ERROR." + err.reason;
                    } else {
                        // redirect to blog page
                        this.router.navigate(['/blog']);
                    }
                });
            }, (err) => {
                // prints out the error message
                this.error = "ACCOUNTS.ERROR." + err.reason;
            });
        } else {
            // all fields are required
            this.error = "ACCOUNTS.ERROR.all_fields_required";
        }
    }

}