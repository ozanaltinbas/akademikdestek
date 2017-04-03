import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import template from './profile-update.component.html';
import style from './profile-update.component.scss';

@Component({
    selector: 'profile-update',
    template,
    styles: [ style ]
})
export class ProfileUpdateComponent implements OnInit {
    updateProfileForm: FormGroup;
    error: string;

    constructor(private zone: NgZone,
                private formBuilder: FormBuilder
               ) {}

    ngOnInit() {
        this.updateProfileForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
    }


}