import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { CookieService } from 'angular2-cookie/core';

import 'moment/locale/tr.js';
import 'moment/locale/en-gb.js';

import * as moment from 'moment/min/moment.min.js';

@Injectable()
export class LanguageService {

    constructor(private translateService: TranslateService,
                private cookieService: CookieService) {}

    initializeLanguage(): void {
        // if there is a cookie variable called lang
        if (this.cookieService.get('lang')) {
            // there is cookie key named lang
            // change the language according to this key
            this.changeLanguage(this.cookieService.get('lang'));
        } // there is no cookie set
        else {
            // initialize language
            this.initializeLanguageForNoCookieKey();
        }
    }

    changeLanguage(code: string): void {
        // to change the language code must be sent
        if (code && code.length > 0) {
            // its ok. lets check it now
            switch (code) {
                // if code is tr
                case 'tr' : 
                    // change the current language as Turkish
                    moment.locale('tr');
                    // change language as turkish
                    this.translateService.use('tr');
                    // break it !
                    break;
                // if it is not tr. set as english
                default:
                    // change the current language as English
                    moment.locale('en-gb');
                    // change language as english
                    this.translateService.use('en-gb');
            }
        }
    }

    initializeLanguageForNoCookieKey(): void {
        // get the browser language
        let browserLang = this.translateService.getBrowserLang();
        // assign language of translate with tr in all conditions
        this.translateService.use(browserLang.match(/tr/) ? 'tr' : 'en-gb');
        // set cookie lang parameter as whatever it is
        this.cookieService.put('lang', this.translateService.currentLang);
    }

}