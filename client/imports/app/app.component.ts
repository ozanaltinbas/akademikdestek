import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent implements OnInit {

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // initialize language settings
    this.languageService.initializeLanguage();
    // initialize wow.js
    new WOW().init();
    // lets use nicescroll library
    $("html").niceScroll();
  }

}
