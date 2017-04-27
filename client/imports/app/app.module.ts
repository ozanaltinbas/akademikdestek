import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MomentModule } from 'angular2-moment';

import { Routes, ROUTES_PROVIDERS } from './app.routes';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

import { HOME_DECLARATIONS } from './home/index';
import { POSTS_DECLARATIONS } from './posts/index';
import { BLOG_DECLARATIONS } from './blog/index';
import { PROFILE_DECLARATIONS } from './profile/index';
import { ACCOUNTS_DECLARATIONS } from './accounts/index';

import { SERVICES_DECLARATIONS } from '../services/index';
import { PIPE_DECLARATIONS } from '../pipes/index';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    AccountsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    Ng2PaginationModule,
    MomentModule
  ],
  declarations: [
    AppComponent,
    LoaderComponent,
    NavigationComponent,
    FooterBarComponent,
    ...ACCOUNTS_DECLARATIONS,
    ...HOME_DECLARATIONS,
    ...POSTS_DECLARATIONS,
    ...BLOG_DECLARATIONS,
    ...PROFILE_DECLARATIONS,
    ...PIPE_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS,
    ...SERVICES_DECLARATIONS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}