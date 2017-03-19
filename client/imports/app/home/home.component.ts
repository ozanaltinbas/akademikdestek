import { Component } from '@angular/core';

import template from './home.component.html';
import style from './home.component.scss';

@Component({
    selector: 'home',
    template,
    styles: [ style ]
})
export class HomeComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

}