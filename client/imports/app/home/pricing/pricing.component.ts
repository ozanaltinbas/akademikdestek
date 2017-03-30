import { Component, OnDestroy } from '@angular/core';

import template from './pricing.component.html';
import style from './pricing.component.scss';

@Component({
    selector: 'pricing',
    template,
    styles: [ style ]
})
export class PricingComponent implements OnDestroy {

    constructor() {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {

    }

}