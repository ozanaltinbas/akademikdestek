import { Component } from '@angular/core';

import template from './blog-entry.component.html';
import style from './blog-entry.component.scss';

@Component({
    selector: 'blog-entry',
    template,
    styles: [ style ]
})
export class BlogEntryComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

}