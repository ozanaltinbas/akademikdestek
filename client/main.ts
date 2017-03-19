import 'angular2-meteor-polyfills';
import 'animate.css/animate.min.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './imports/app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);