import { Component } from '@angular/core';

import template from './team.component.html';
import style from './team.component.scss';

@Component({
    selector: 'team',
    template,
    styles: [ style ]
})
export class TeamComponent {

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        new WOW().init();
    }

    showTeamFirstDetail(): void {
        $('#team-first-modal').modal()
    }

    showTeamSecondDetail(): void {
        $('#team-second-modal').modal()
    }

    showTeamThirdDetail(): void {
        $('#team-third-modal').modal()
    }

}