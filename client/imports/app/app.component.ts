import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment';
import 'moment/min/locales';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.addLangs(["tr"]);
    translate.setDefaultLang('tr');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/tr/) ? browserLang : 'tr');
    moment.locale('tr-tr');
  }

  ngOnInit() {
    $("html").niceScroll();
    new WOW().init();
  }

  ngAfterViewInit(): void {

  }

}
