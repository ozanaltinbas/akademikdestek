import { Component } from '@angular/core';

import template from './loader.component.html';
import style from './loader.component.scss';

@Component({
    selector: 'loader',
    template,
    styles: [ style ]
})
export class LoaderComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

}