import { Component, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import '../../../../../both/methods/contact.methods.ts';

import template from './contact.component.html';
import style from './contact.component.scss';

@Component({
    selector: 'contact',
    template,
    styles: [ style ]
})
export class ContactComponent implements OnInit {

    mailForm: FormGroup;
    onProgress: boolean = false;

    constructor(private formBuilder:FormBuilder) {
    }

    ngOnInit() {
        this.initializeContactForm();
    }

    ngAfterViewInit(): void {

    }

    initializeContactForm() : void {
        this.mailForm = this.formBuilder.group({
            email: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    sendEmail(event) {
        // prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.mailForm.valid) {
            // set as on progress
            this.onProgress = true;
            // send the mail.
            MeteorObservable.call('sendMail', this.mailForm.value.email, this.mailForm.value.subject, this.mailForm.value.message).subscribe(() => {
                // mail successfully sent.
                this.initializeContactForm();
                this.onProgress = false;
                $('#message-send').modal();
            }, (error) => {
                this.onProgress = false;
                $('#message-not-send').modal();
            });
        }
    }

}