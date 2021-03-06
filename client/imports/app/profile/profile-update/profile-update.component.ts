import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../../../both/models/user.model';
import { AccountsService } from '../../../services/accounts.service';

import template from './profile-update.component.html';
import style from './profile-update.component.scss';

import '../../../../../both/methods/user.methods.ts';

@Component({
    selector: 'profile-update',
    template,
    styles: [ style ]
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {

    error: string = '';
    success: string = '';
    currentUser: User;
    profileUpdateForm: FormGroup;
    notLoaded: boolean = true;
    autorunSub: Subscription;
    showChangePassword: boolean = false;
    genders: any[];
    images: string[];
    imagesSubs: Subscription;

    constructor(private formBuilder: FormBuilder,
                private accountsService: AccountsService) {}

    ngOnInit() {
        // subscribe to images
        this.imagesSubs = MeteorObservable.subscribe('images').subscribe(() => {
            // assign the user to current user.
            this.currentUser = Meteor.user();
            // if it is subscribed
            if (this.autorunSub) {
                // unsubscribe it
                this.autorunSub.unsubscribe();
            }
            // detect changes
            this.autorunSub = MeteorObservable.autorun().subscribe(() => {
                // the following will trigger if Meteor.user() changes
                this.currentUser = Meteor.user();
                // if it is not null now
                if (this.currentUser) {
                    // initialize the form data
                    this.initializeFormData();
                    // set the page as loaded.
                    this.notLoaded = false;
                }
            });
            // also initialize gender
            this.initializeGenderData();
        });
    }

    initializeFormData(): void {
        // initialize the form
        this.profileUpdateForm = this.formBuilder.group({
            firstname: [this.currentUser.profile.firstname, Validators.required],
            lastname: [this.currentUser.profile.lastname, Validators.required],
            email: [this.currentUser.emails[0].address, Validators.required],
            gender: [this.currentUser.profile.gender]
        });
    }

    updateProfile(): void {
        // initiazlie error message
        this.error = '';
        // initialize success message
        this.success = '';
        // if our form is valid.
        if (this.profileUpdateForm.valid) {
            // our form is valid.
            const profileInfo = {
                'userId': this.currentUser._id,
                'firstname': this.profileUpdateForm.value.firstname,
                'lastname': this.profileUpdateForm.value.lastname,
                'email': this.profileUpdateForm.value.email,
                'gender': this.profileUpdateForm.value.gender
            };
            // update the user profile.
            MeteorObservable.call('updateProfile', profileInfo).subscribe(() => {
                    // update success message
                    this.success = 'PROFILE.profile_update_success';
                }, (error) => {
                    this.error = 'PROFILE.profile_update_fail';
            });
        } // if form is not valid.
        else {
            // all fields are required
            this.error = this.accountsService.generateMessageText('error', 'All fields required');
        }
    }

    displayChangePassword() : void {
        // toggle it
        this.showChangePassword = !this.showChangePassword;
    }

    initializeGenderData(): void {
        // initialize gender data
        this.genders = [
            {value : '', description : 'profile.none'},
            {value : 'M', description : 'profile.male'},
            {value: 'F', description : 'profile.female'}
        ];
    }

    dismiss(type: string) : void {
        // if input is sent
        if (type && type.length > 0) {
            // type must be success or error
            if (type === 'error') {
                // initialize error message
                this.error = '';
            } // if it is success
            else if (type = 'success') {
                // initialize success message
                this.success = '';
            }
        }
    }

    onImage(imageId: string) {
        this.images.push(imageId);
    }

    ngOnDestroy() {
        this.autorunSub.unsubscribe();
        this.imagesSubs.unsubscribe();
    }

}