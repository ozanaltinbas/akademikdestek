import 'angular2-meteor-polyfills';
import 'animate.css/animate.min.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './imports/app/app.module';

/*
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
 */

Meteor.startup(() => {
    const subscription = MeteorObservable.autorun().subscribe(() => {
        if (Meteor.loggingIn()) {
            return;
        }

        setTimeout(() => subscription.unsubscribe());
        platformBrowserDynamic().bootstrapModule(AppModule);
    });
});
