import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { RecoverComponent } from './accounts/recover/recover.component';
import { BlogComponent } from './blog/blog.component';
import { ProfileComponent } from './profile/profile.component';

export const Routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: ['canActivateForNotLoggedIn'] },
  { path: 'signup', component: SignupComponent, canActivate: ['canActivateForNotLoggedIn'] },
  { path: 'recover', component: RecoverComponent, canActivate: ['canActivateForNotLoggedIn'] },
  { path: 'blog', component: BlogComponent },
  { path: 'profile', component: ProfileComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [
  {
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
  },
  {
    provide: 'canActivateForNotLoggedIn',
    useValue: () => !!! Meteor.userId()
  }];
