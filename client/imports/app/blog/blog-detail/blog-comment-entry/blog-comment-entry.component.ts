import { Component, OnInit, Input } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import '../../../../../../both/methods/blog-comments.methods.ts';

import template from './blog-comment-entry.component.html';
import style from './blog-comment-entry.component.scss';

@Component({
    selector: 'blog-comment-entry',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class BlogCommentEntryComponent implements OnInit {

    @Input() blogId: string;
    blogCommentForm: FormGroup;
    user: Meteor.User;
    onProgress: boolean = false;

    constructor(private formBuilder:FormBuilder) {

    }

    ngOnInit() {
        this.initializeBlogCommentEntryForm();
    }

    ngAfterViewInit(): void {

    }

    initializeBlogCommentEntryForm() : void {
        // initialize blog form
        this.blogCommentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    insertBlogComment(event) {
        // prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.blogCommentForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('insertBlogComment', this.blogId, this.blogCommentForm.value.content, this.user._id).subscribe(() => {
                // mail successfully sent.
                this.initializeBlogCommentEntryForm();
                this.onProgress = false;
            }, (error) => {
                this.onProgress = false;
                console.log(error);
            });
        }
    }
}