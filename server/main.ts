import { Meteor } from 'meteor/meteor';
import './imports/publications/blogs.ts';
import './imports/publications/blog-comments.ts';

import { startServiceConfiguration } from './imports/service-configuration';
import { startSmtpConfiguration } from './imports/smtp';

Meteor.startup(() => {
    startServiceConfiguration();
    startSmtpConfiguration();
});