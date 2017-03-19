import { Component } from '@angular/core';

import template from './signup.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'signup',
    template,
    styles: [ style ]
})
export class SignupComponent {

    constructor() {}

    ngAfterViewInit(): void {

    }

}