import { Component } from '@angular/core';

import template from './posts.component.html';
import style from './posts.component.scss';

@Component({
    selector: 'posts',
    template,
    styles: [ style ]
})
export class PostsComponent {

    constructor() {}

}