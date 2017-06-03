import { Meteor } from 'meteor/meteor';
import { Route } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { LoginComponent } from './accounts/login/login.component';
import { RecoverComponent } from './accounts/recover/recover.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/posts-list/post-detail/post-detail.component';
import { VerifyComponent } from './accounts/verify/verify.component';
import { VerifyEmailComponent } from './accounts/verify-email/verify-email.component';
import { ResetPasswordComponent } from './accounts/reset-password/reset-password.component';

export const Routes: Route[] = [
  {
    path: 'post/:postId',
    component: PostDetailComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'blog/:blogId',
    component: BlogDetailComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'verify-email/:token',
    component: VerifyEmailComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'recover',
    component: RecoverComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: ['canActivateForLoggedIn']
  },
  { path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

export const ROUTES_PROVIDERS = [
  {
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
  }
];