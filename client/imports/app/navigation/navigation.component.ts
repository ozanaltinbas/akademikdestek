import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AccountsService } from '../../services/accounts.service';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from './navigation.component.html';
import style from './navigation.component.scss';

@Component({
    selector: 'navigation',
    template,
    styles: [ style ]
})
@InjectUser('user')
export class NavigationComponent {

    constructor(private translate: TranslateService,
                private accountsService: AccountsService) {
    }

    ngAfterViewInit(): void {

        $(window).scroll(function() {
            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
                $(".scroll-top").fadeIn('1000', "easeInOutExpo");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
                $(".scroll-top").fadeOut('1000', "easeInOutExpo");
            }
        });

    }

    changeLanguage($event) {
        // prevent default action
        $event.preventDefault();
        // check the current language
        if (this.translate.currentLang && this.translate.currentLang === 'tr') {
            // let's convert it to english.
            this.translate.use('en');
        } // else,
        else {
            // let's convert it to turkish.
            this.translate.use('tr');
        }
    }

    logout() {
        // logout the user
        this.accountsService.logout();
    }

}