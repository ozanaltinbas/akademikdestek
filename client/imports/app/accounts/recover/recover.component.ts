import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
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
    error: string;

    constructor(private router: Router,
                private zone: NgZone,
                private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        this.recoverForm = this.formBuilder.group({
            email: ['', Validators.required]
        });

        this.error = '';
    }

    recover() {
        // service error message holder
        let serviceErrorMessage = '';
        // if all fields are filled
        if (this.recoverForm.valid) {
            // lets validate the form
            serviceErrorMessage = this.accountsService.validateRecoverForm(this.recoverForm);
            // if there is an error,
            if (serviceErrorMessage && serviceErrorMessage.length > 0) {
                // lets update the error message
                this.zone.run(() => {
                    // update the error message
                    this.error = serviceErrorMessage;
                });
                // stop going forward
                return;
            }
            Accounts.forgotPassword({
                email: this.recoverForm.value.email
            }, (err) => {
                if (err) {
                    this.zone.run(() => {
                        console.log(err);
                        this.error = err;
                    });
                } else {
                    this.router.navigate(['/']);
                }
            });
        } else {
            this.zone.run(() => {
                this.error = "ACCOUNTS.ERROR.all_fields_required";
            });
        }
    }
}