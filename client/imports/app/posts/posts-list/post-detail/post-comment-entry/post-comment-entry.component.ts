import { Component, OnInit, Input } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { TranslateService } from 'ng2-translate';

import '../../../../../../../both/methods/post-comments.methods.ts';

import template from './post-comment-entry.component.html';
import style from './post-comment-entry.component.scss';

@Component({
    selector: 'post-comment-entry',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class PostCommentEntryComponent implements OnInit {

    @Input() postId: string;
    postCommentForm: FormGroup;
    user: Meteor.User;
    onProgress: boolean = false;
    error: string = '';
    success: string = '';

    constructor(private formBuilder: FormBuilder,
                private translateService: TranslateService) {}

    ngOnInit() {
        // initialize post comment entry form
        this.initializePostCommentEntryForm();
    }

    initializePostCommentEntryForm() : void {
        // initialize blog form
        this.postCommentForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
    }

    insertPostComment(event) {
        // initiailze error message
        this.error = '';
        // initialize success message
        this.success = '';
        // prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.postCommentForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            console.log(this.postId);
            console.log(this.postCommentForm.value.content);
            console.log(this.user._id);
            MeteorObservable.call('insertPostComment', this.postId, this.postCommentForm.value.content, this.user._id).subscribe(() => {
                // post comment successfully inserted
                this.initializePostCommentEntryForm();
                this.onProgress = false;
            }, (error) => {
                this.onProgress = false;
                console.log(error);
            });
        } // if form is not valid.
        else {
            // set the error message
            this.translateService.get('accounts.error.All fields required').subscribe((res: string) => {
                // print the error message
                this.error = res;
            });
        }
    }
}