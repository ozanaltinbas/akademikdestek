import { Component } from '@angular/core';

import template from './about.component.html';
import style from './about.component.scss';

@Component({
    selector: 'about',
    template,
    styles: [ style ]
})
export class AboutComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

        $(function() {
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });

    }

}