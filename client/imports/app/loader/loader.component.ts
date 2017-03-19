import { Component, Input } from '@angular/core';

import style from './loader.component.scss';
import template from './loader.component.html';

@Component({
    selector: 'loader',
    template,
    styles: [
        style
    ]
})

export class LoaderComponent {
    
    constructor() {}
}