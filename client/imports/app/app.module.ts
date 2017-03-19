import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "@angular/material";

import { Routes } from './app.routes';
import { AppComponent } from './app.component';
import { NAVIGATION_DECLARATIONS } from './navigation/index';
import { HOME_DECLARATIONS } from './home/index';
import { BLOG_DECLARATIONS } from './blog/index';
import { LOADER_DECLARATIONS } from './loader/index';
import { FOOTER_DECLARATIONS } from './footer-bar/index';
import { ACCOUNTS_DECLARATIONS } from './accounts/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(Routes)
  ],
  declarations: [
    AppComponent,
    ...NAVIGATION_DECLARATIONS,
    ...HOME_DECLARATIONS,
    ...BLOG_DECLARATIONS,
    ...LOADER_DECLARATIONS,
    ...FOOTER_DECLARATIONS,
    ...ACCOUNTS_DECLARATIONS
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}