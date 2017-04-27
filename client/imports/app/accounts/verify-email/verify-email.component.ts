import { Component, OnInit } from '@angular/core';
import { Accounts } from 'meteor/accounts-base';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';

import template from './verify-email.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'verify-email',
    template,
    styles: [ style ]
})
export class VerifyEmailComponent implements OnInit {

    paramsSub: Subscription;
    error: string;
    onProgress: boolean = true;

    // dependency injections
    constructor(private route: ActivatedRoute,
                private router: Router,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // get the input parameter
        this.paramsSub = this.route.params
            .map(params => params['token'])
            .subscribe(token => {
                // verify1 user email
                Accounts.verifyEmail(token, (error) => {
                    // if error occurs
                    if (error) {
                        // if link expired, give the proper message
                        if (error.reason === 'Verify email link expired') {
                            // set as error
                            console.log("1");
                            this.error = this.accountsService.generateMessageText('error', error.reason);;
                        } // another errors,
                        else {
                            // alert it
                            this.error = error.reason;
                        }
                        // set on progress as false
                        this.onProgress = false;
                    } // if successfully verified
                    else {
                        // redirect to blog page
                        this.router.navigate(['/blog']);
                    }
                });
            });
        // redirect on login
        this.router.navigate(['/login']);
    }

    redirectToVerifyEmail() : void {
        // redirect to verify email
        this.router.navigate(['/verify']);
    }

}