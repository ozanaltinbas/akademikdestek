import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

@Injectable()
export class AccountsService {

    constructor(private router: Router) {

    }

    user: Meteor.User;

    isLoggedIn(): boolean {
        if (this.user && this.user._id) return true;
        return false;
    }

    validateUsername(username: string) : string {
        if (username && username.length >= 3) {
            return '';
        }
        return "ACCOUNTS.ERROR.username_length";
    }

    validateEmail(email: string) : string {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return '';
        }
        return "ACCOUNTS.ERROR.email_not_valid";
    }

    validatePassword(password: string) : string {
        if (password && password.length > 5) {
            return '';
        }
        return "ACCOUNTS.ERROR.password_length";
    }

    validatePasswordAgain(passwordAgain: string) : string {
        if (passwordAgain && passwordAgain.length > 5) {
            return '';
        }
        return "ACCOUNTS.ERROR.password_again_length";
    }

    validatePasswordsEquation(password: string, passwordAgain: string) : string {
        if (password === passwordAgain) {
            return '';
        }
        return "ACCOUNTS.ERROR.passwords_not_equal";
    }

    validateSignupForm(signupForm: FormGroup) : string {
        let result = '';
        result = this.validateUsername(signupForm.value.username);
        if (result && result.length > 0) {
            return result;
        }
        result = this.validateEmail(signupForm.value.email);
        if (result && result.length > 0) {
            return result;
        }
        result = this.validatePassword(signupForm.value.password);
        if (result && result.length > 0) {
            return result;
        }
        result = this.validatePasswordAgain(signupForm.value.passwordAgain);
        if (result && result.length > 0) {
            return result;
        }
        result = this.validatePasswordsEquation(signupForm.value.password, signupForm.value.passwordAgain);
        if (result && result.length > 0) {
            return result;
        }
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