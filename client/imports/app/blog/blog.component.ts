import { Component } from '@angular/core';

import template from './blog.component.html';
import style from './blog.component.scss';

@Component({
    selector: 'blog',
    template,
    styles: [ style ]
})
export class BlogComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

}