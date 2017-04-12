import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import * as moment from 'moment';
import 'moment/locale/tr.js';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
    // initialize language settings
    this.initializeLanguageSettings();
    // lets use nicescroll library
    $("html").niceScroll();
    // lets use WOW.js library for better view
    new WOW().init();
  }

  initializeLanguageSettings(): void {
    // set default language as tr
    this.translate.setDefaultLang('tr');
    // get the browser language
    let browserLang = this.translate.getBrowserLang();
    // assign language of translate with tr in all conditions
    this.translate.use(browserLang.match(/tr/) ? browserLang : 'tr');
    // set locale as tr-tr on default.
    moment.locale('tr-tr');
  }

}
