import { Component } from '@angular/core';

import template from './login.component.html';
import style from '../accounts.scss';

@Component({
    selector: 'login',
    template,
    styles: [ style ]
})
export class LoginComponent {

    constructor() {}

    ngAfterViewInit(): void {

    }


}