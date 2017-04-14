import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

@Injectable()
export class AccountsService {

    constructor(private router: Router) {}

    validateUsername(username: string) : string {
        // error message handler
        let error: string = '';
        // if username entered
        if (username && username.length > 0) {
            // username entered. Trim all user input.
            let usernameTrimmed = username.replace(/ /g, '');
            // if length becomes 0 after replacing
            if (usernameTrimmed.length === 0) {
                // user must enter valid characters
                error = 'ACCOUNTS.ERROR.username_valid_character';
            } // it's ok for now. Validate the length
            else {
                // Username must at least 3 characters long
                if (usernameTrimmed.length < 3) {
                    // give the error
                    error = 'ACCOUNTS.ERROR.username_min_length';
                } // if username is more than 64 characters long
                else if (usernameTrimmed.length > 64) {
                    // give the error
                    error = 'ACCOUNTS.ERROR.username_max_length';
                }
            }
        } // if no username entered
        else {
            error = 'ACCOUNTS.ERROR.username_required';
        }
        // return the error message
        return error;
    }

    validateEmail(email: string) : string {
        // error message handler
        let error: string = '';
        // if email entered
        if (email && email.length > 0) {
            // email entered. Lets validate it.
            if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                // email is not valid.
                error = "ACCOUNTS.ERROR.email_not_valid";
            }
        } // no email entered
        else {
            error = "ACCOUNTS.ERROR.email_required";
        }
        // return the error message
        return error;
    }

    validatePassword(password: string) : string {
        // error message handler
        let error: string = '';
        // if password entered
        if (password && password.length > 0) {
            // password entered. Lets trim it.
            let passwordTrimmed = password.replace(/ /g, '');
            // if length becomes 0 after replacing
            if (passwordTrimmed.length === 0) {
                // user must enter valid characters
                error = 'ACCOUNTS.ERROR.password_valid_character';
            } // it's ok for now. Validate the length
            else {
                // Password must at least 6 characters long
                if (passwordTrimmed.length < 6) {
                    // give the error
                    error = 'ACCOUNTS.ERROR.password_min_length';
                } // if username is more than 64 characters long
                else if (passwordTrimmed.length > 256) {
                    // give the error
                    error = 'ACCOUNTS.ERROR.password_max_length';
                }
            }
        } // if no password entered
        else {
            error = "ACCOUNTS.ERROR.password_required";
        }
        // return the error message
        return error;
    }

    validatePasswordAgain(passwordAgain: string, password: string) : string {
        // error message handler
        let error: string = '';
        // if passwordAgain entered
        if (passwordAgain && passwordAgain.length > 0) {
            // passwordAgain entered. Lets trim it.
            let passwordAgainTrimmed = passwordAgain.replace(/ /g, '');
            // if length becomes 0 after replacing
            if (passwordAgainTrimmed.length === 0) {
                // user must enter valid characters
                error = 'ACCOUNTS.ERROR.passwordAgain_valid_character';
            } // it's ok for now. Validate equation
            else {
                // if passwords not equal
                if (passwordAgain !== password) {
                    // passwords not equal
                    error = 'ACCOUNTS.ERROR.passwords_not_equal';
                }
            }
        }  // if no passwordAgain entered
        else {
            error = "ACCOUNTS.ERROR.passwordAgain_required";
        }
        // return the error message
        return error;
    }

    validateSignupForm(signupForm: FormGroup) : string {
        // Start validating the signup form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (signupForm.valid) {
            // sounds good. initial validation passed.
            // username validation starts.
            result = this.validateUsername(signupForm.value.username);
            // if result is not empty.
            if (!result) {
                // if no error. go on more.
                result = this.validateEmail(signupForm.value.email);
            }
            // if result is not empty.
            if (!result) {
                // if no error. go on more.
                result = this.validatePassword(signupForm.value.password);
            }
            // if result is not empty.
            if (!result) {
                // if no error. go on more.
                result = this.validatePasswordAgain(signupForm.value.passwordAgain, signupForm.value.password);
            }
        } // form is not valid.
        else {
            result = 'ACCOUNTS.ERROR.all_fields_required';
        }
        // return the error message
        return result;
    }

    validateLoginForm(loginForm: FormGroup) : string {
        let result = '';
        result = this.validatePassword(loginForm.value.password);
        if (result && result.length > 0) {
            return result;
        }
        return result;
    }

    validateRecoverForm(recoverForm: FormGroup) : string {
        let result = '';
        result = this.validateEmail(recoverForm.value.email);
        if (result && result.length > 0) {
            return result;
        }
        return result;
    }

    logout() : void {
        Meteor.logout();
        this.router.navigate(['/']);
    }

}