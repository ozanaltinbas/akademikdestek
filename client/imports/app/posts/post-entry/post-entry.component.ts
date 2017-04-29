import { Component, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { TranslateService } from 'ng2-translate';
import { InjectUser } from "angular2-meteor-accounts-ui";

import '../../../../../node_modules/materialize-css/js/collapsible.js';
import '../../../../../both/methods/post.methods.ts';

import template from './post-entry.component.html';
import style from './post-entry.component.scss';

@Component({
    selector: 'post-entry',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class PostEntryComponent implements OnInit {

    postEntryForm: FormGroup;
    user: Meteor.User;
    onProgress: boolean = false;
    success: string = '';
    error: string = '';

    constructor(private formBuilder: FormBuilder,
            private translateService: TranslateService) {}

    ngOnInit() {
        // initialize post entry form
        this.initializePostEntryForm();
        // initialize the collapsible
        $('.collapsible').collapsible();
        // open collapsible on default
        $('.collapsible').collapsible('open', 0);
    }

    insertPost(event: any) : void {
        // initialize error message
        this.error = '';
        // initialize success message
        this.success = '';
        // if all fields are filled
        if (this.postEntryForm.valid) {
            // if we are not progressing
            if (this.onProgress === false) {
                // set as on progress
                this.onProgress = true;
                // time to create the input object of insertPost
                const post = {
                    'title' : this.postEntryForm.value.title,
                    'content' : this.postEntryForm.value.content,
                    'owner' : this.user._id
                };
                // insert it now
                MeteorObservable.call('insertPost', post).subscribe(() => {
                    // close collapsible
                    $('.collapsible').collapsible('close', 0);
                    // post inserted. initialize the form
                    this.initializePostEntryForm();
                    // set the success message
                    this.translateService.get('posts.post-entry.success').subscribe((res: string) => {
                        this.success = res;
                    });
                }, (err) => {
                    // prints out the error message
                    this.error = 'err.reason';
                    // set on progress as false
                    this.onProgress = false;
                });
            }
        } // if form is not valid.
        else {
            // set the error message
            this.translateService.get('accounts.error.All fields required').subscribe((res: string) => {
                // print the error message
                this.error = res;
            });
        }
    }

    initializePostEntryForm() : void {
        // initialize postEntryForm form
        this.postEntryForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });
        // set on progress as false
        this.onProgress = false;
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

    clear() : void {
        // initialize form
        this.initializePostEntryForm();
    }

}