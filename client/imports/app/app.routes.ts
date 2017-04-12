import { Route } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { LoginComponent } from './accounts/login/login.component';
import { RecoverComponent } from './accounts/recover/recover.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';

import { LoggedInGuard } from '../services/logged-in-guard';
import { LoggedOutGuard } from '../services/logged-out-guard';

export const Routes: Route[] = [
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog/:blogId',
    component: BlogDetailComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'recover',
    component: RecoverComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  { path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];