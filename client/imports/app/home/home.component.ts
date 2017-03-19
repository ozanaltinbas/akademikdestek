import { Component, OnDestroy } from '@angular/core';

import template from './home.component.html';
import style from './home.component.scss';

@Component({
    selector: 'home',
    template,
    styles: [ style ]
})
export class HomeComponent implements OnDestroy {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {

    }

}