import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';

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
                error = 'accounts.error.username-invalid-character';
            } // it's ok for now. Validate the length
            else {
                // Username must at least 3 characters long
                if (usernameTrimmed.length < 3) {
                    // give the error
                    error = 'accounts.error.username-min-length';
                } // if username is more than 64 characters long
                else if (usernameTrimmed.length > 64) {
                    // give the error
                    error = 'accounts.error.username-max-length';
                }
            }
        } // if no username entered
        else {
            error = 'accounts.error.username-required';
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
                error = "accounts.error.email-invalid-character";
            }
        } // no email entered
        else {
            error = "accounts.error.email-required";
        }
        // return the error message
        return error;
    }

    validateFirstname(firstname: string) : string {
        // error message handler
        let error: string = '';
        // if firstname entered
        if (firstname && firstname.length > 0) {
            // firstname entered. Trim all user input.
            let firstnameTrimmed = firstname.replace(/ /g, '');
            // if length becomes 0 after replacing
            if (firstnameTrimmed.length === 0) {
                // user must enter valid characters
                error = 'accounts.error.firstname-valid-character';
            } // it's ok for now. Validate the length
            else {
                // firstname must at least 2 characters long
                if (firstnameTrimmed.length < 2) {
                    // give the error
                    error = 'accounts.error.firstname_min_length';
                } // if firstname is more than 64 characters long
                else if (firstnameTrimmed.length > 64) {
                    // give the error
                    error = 'accounts.error.firstname-max-length';
                }
            }
        } // if no username entered
        else {
            error = 'accounts.error.firstname-required';
        }
        // return the error message
        return error;
    }

    validateLastname(lastname: string) : string {
        // error message handler
        let error: string = '';
        // if lastname entered
        if (lastname && lastname.length > 0) {
            // lastname entered. Trim all user input.
            let lastnameTrimmed = lastname.replace(/ /g, '');
            // if length becomes 0 after replacing
            if (lastnameTrimmed.length === 0) {
                // user must enter valid characters
                error = 'accounts.error.lastname-valid-character';
            } // it's ok for now. Validate the length
            else {
                // lastname must at least 3 characters long
                if (lastnameTrimmed.length < 2) {
                    // give the error
                    error = 'accounts.error.lastname-min-length';
                } // if lastname is more than 64 characters long
                else if (lastnameTrimmed.length > 64) {
                    // give the error
                    error = 'accounts.error.lastname-max-length';
                }
            }
        } // if no username entered
        else {
            error = 'accounts.error.lastname-required';
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
                error = 'accounts.error.password-invalid-character';
            } // it's ok for now. Validate the length
            else {
                // Password must at least 6 characters long
                if (passwordTrimmed.length < 6) {
                    // give the error
                    error = 'accounts.error.password-min-length';
                } // if username is more than 64 characters long
                else if (passwordTrimmed.length > 256) {
                    // give the error
                    error = 'accounts.error.password-max-length';
                }
            }
        } // if no password entered
        else {
            error = "accounts.error.password-required";
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
                error = 'accounts.error.passwordAgain-invalid-character';
            } // it's ok for now. Validate equation
            else {
                // if passwords not equal
                if (passwordAgain !== password) {
                    // passwords not equal
                    error = 'accounts.error.passwords-not-equal';
                }
            }
        }  // if no passwordAgain entered
        else {
            error = "accounts.error.password-again-required";
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
            // if result is empty.
            if (!result) {
                // if no error. go on more.
                result = this.validateEmail(signupForm.value.email);
            }
            // if result is empty.
            if (!result) {
                // if no error. go on more.
                result = this.validateFirstname(signupForm.value.firstname);
            }
            // if result is empty.
            if (!result) {
                // if no error. go on more.
                result = this.validatePassword(signupForm.value.password);
            }
            // if result is empty.
            if (!result) {
                // if no error. go on more.
                result = this.validatePasswordAgain(signupForm.value.passwordAgain, signupForm.value.password);
            }
        } // form is not valid.
        else {
            result = 'accounts.error.all-fields-required';
        }
        // return the error message
        return result;
    }

    validateLoginForm(loginForm: FormGroup) : string {
        // Start validating the signup form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (loginForm.valid) {
            // sounds good. initial validation passed.
            // email validation starts.
            result = this.validateEmail(loginForm.value.usernameOrEmail);
            // if it is not an email check if it is username
            if (result && result.length > 0) {
                // username validation
                result = this.validateUsername(loginForm.value.usernameOrEmail);
            }
            // validate the password
            if (!result) {
                // password validation
                result = this.validatePassword(loginForm.value.password);
            }
        } // form is not valid.
        else {
            result = 'accounts.error.all-fields-required';
        }
        // return the error message
        return result;
    }

    validateVerifyEmailForm(verifyEmailForm: FormGroup) : string {
        // Start validating the signup form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (verifyEmailForm.valid) {
            // email validation starts.
            result = this.validateEmail(verifyEmailForm.value.usernameOrEmail);
            // if it is not an email check if it is username
            if (result && result.length > 0) {
                // username validation
                result = this.validateUsername(verifyEmailForm.value.usernameOrEmail);
            }
        }
        // return the error message
        return result;
    }

    validateRecoverForm(recoverForm: FormGroup) : string {
        // Start validating the signup form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (recoverForm.valid) {
            // email validation starts.
            result = this.validateEmail(recoverForm.value.usernameOrEmail);
            // if it is not an email check if it is username
            if (result && result.length > 0) {
                // username validation
                result = this.validateUsername(recoverForm.value.usernameOrEmail);
            }
        }
        // return the error message
        return result;
    }

    validateResetPasswordForm(resetPasswordForm: FormGroup) : string {
        // Start validating the signup form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (resetPasswordForm.valid) {
            // password validation starts.
            result = this.validatePassword(resetPasswordForm.value.password);
            // if result is empty.
            if (!result) {
                // if no error. go on more.
                result = this.validatePasswordAgain(resetPasswordForm.value.passwordValidate, resetPasswordForm.value.password);
            }
        }
        // return the error message
        return result;
    }

    validatePasswordUpdateForm(passwordUpdateForm: FormGroup) : string {
        // Start validating the password update form
        let result: string = '';
        // result handler is created. first of all lets check the form object
        if (passwordUpdateForm.valid) {
            // sounds good. initial validation passed.
            // current password validation starts.
            result = this.validatePassword(passwordUpdateForm.value.currentPassword);
            // if it is not an email check if it is username
            if (result && result.length > 0) {
                // new password validation
                result = this.validatePassword(passwordUpdateForm.value.newPassword);
            }
            // validate the password
            if (!result) {
                // password validation
                result = this.validatePassword(passwordUpdateForm.value.newPasswordAgain);
            }
        } // form is not valid.
        else {
            result = 'accounts.error.all-fields-required';
        }
        // return the error message
        return result;
    }

    logout() : void {
        // logout all clients
        Meteor.logout();
        // the redirect to home
        this.router.navigate(['/']);
    }

    generateMessageText(type: string, text: string) : string {
        // initialize the result handler
        let result = '';
        // if there is an error
        if (text && text.length > 0) {
            // there is an error. Generate it
            result = 'accounts.' + type + '.' + text;
        }
        // return the generated text
        return result;
    }

    autoRedirect(type: string): void {
        // input type must be sent
        if (type && type.length > 0) {
            // if logout action is needed
            if (type === 'logout') {
                // detect changes
                MeteorObservable.autorun().subscribe(() => {
                    // if user is logged off
                    if (Meteor.userId() === undefined || Meteor.userId() === null) {
                        // redirect to home page
                        this.router.navigate(['/']);
                    }
                });
            } // if login action is needed
            else if (type === 'login') {
                // detect changes
                MeteorObservable.autorun().subscribe(() => {
                    // if user is logged in
                    if (Meteor.userId() && Meteor.userId().length > 0) {
                        // redirect to blog page
                        this.router.navigate(['/blog']);
                    }
                });
            }
        }
    }

}