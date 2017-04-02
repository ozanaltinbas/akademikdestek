import { Component, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import '../../../../../both/methods/blog.methods.ts';

import template from './blog-entry.component.html';
import style from './blog-entry.component.scss';

@Component({
    selector: 'blog-entry',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class BlogEntryComponent implements OnInit {

    blogForm: FormGroup;
    user: Meteor.User;
    onProgress: boolean = false;

    constructor(private formBuilder:FormBuilder) {

    }

    ngOnInit() {
        this.initializeBlogEntryForm();
    }

    ngAfterViewInit(): void {

    }

    initializeBlogEntryForm() : void {
        // initialize blog form
        this.blogForm = this.formBuilder.group({
            title: ['', Validators.required],
            subtitle: ['', Validators.required],
            content: ['', Validators.required]
        });
    }

    insertBlog(event) {
        // prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.blogForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('insertBlog', this.blogForm.value.title, this.blogForm.value.subtitle, this.blogForm.value.content, this.user._id).subscribe(() => {
                // mail successfully sent.
                this.initializeBlogEntryForm();
                this.onProgress = false;
            }, (error) => {
                this.onProgress = false;
            });
        }
    }

}