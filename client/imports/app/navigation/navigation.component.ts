import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AccountsService } from '../../services/accounts.service';
import { LanguageService } from '../../services/language.service';
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
                private accountsService: AccountsService,
                private languageService: LanguageService) {}
    
    changeLanguage($event) {
        // prevent default action
        $event.preventDefault();
        // check the current language
        if (this.translate.currentLang && this.translate.currentLang === 'tr') {
            // let's convert it to english.
            this.languageService.changeLanguage('en');
        } // else,
        else {
            // let's convert it to turkish.
            this.languageService.changeLanguage('tr');
        }
    }

    logout() {
        // logout the user
        this.accountsService.logout();
    }

}