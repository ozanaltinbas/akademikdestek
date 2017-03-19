import { Component, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import template from './contact.component.html';
import style from './contact.component.scss';

@Component({
    selector: 'contact',
    template,
    styles: [ style ]
})
export class ContactComponent implements OnInit {

    mailForm: FormGroup;
    selectedOption: string;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.mailForm = this.formBuilder.group({
            email: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {

    }

    sendEmail(event) {
        // Prevent default event.
        event.preventDefault();
        // if the mail form is valid,
        if (this.mailForm.valid) {
            // Send the mail.
            MeteorObservable.call('sendMail', this.mailForm.value.email, this.mailForm.value.subject, this.mailForm.value.message).subscribe(() => {
                // Mail successfully sent.
                console.log("mail gönderildi.");
            }, (error) => {
                // Unable to send email.
                console.log(error);
            });
        }
    }

}