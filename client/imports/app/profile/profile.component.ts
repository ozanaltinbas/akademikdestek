import { Component } from '@angular/core';

import template from './profile.component.html';
import style from './profile.component.scss';

@Component({
    selector: 'profile',
    template,
    styles: [ style ]
})
export class ProfileComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

}