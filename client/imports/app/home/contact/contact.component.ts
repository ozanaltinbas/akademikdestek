import { Component, OnInit, ViewContainerRef, onDestroy } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageNotSendComponent } from './message/message-not-send.component';
import { MessageSendComponent } from './message/message-send.component';

import template from './contact.component.html';
import style from './contact.component.scss';

@Component({
    selector: 'contact',
    template,
    styles: [ style ]
})
export class ContactComponent implements OnInit, OnDestroy {

    mailForm:FormGroup;

    constructor(private formBuilder:FormBuilder) {
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

    ngOnDestroy(): void {
        
    }

}