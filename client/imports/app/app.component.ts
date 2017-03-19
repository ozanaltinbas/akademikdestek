import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent {

  constructor(private translate: TranslateService) {

    translate.addLangs(["en", "tr"]);
    translate.setDefaultLang('tr');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/tr/) ? browserLang : 'en');
    
    $("html").niceScroll();
  }

  ngAfterViewInit(): void {

  }

}
