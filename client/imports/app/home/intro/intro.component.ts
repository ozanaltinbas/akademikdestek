import { Component } from '@angular/core';

import template from './intro.component.html';
import style from './intro.component.scss';

@Component({
    selector: 'intro',
    template,
    styles: [ style ]
})
export class IntroComponent {

    constructor() {

    }

    ngAfterViewInit(): void {

        $(function() {
            $('a.angle-down').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });

    }

}