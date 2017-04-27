import { Meteor } from 'meteor/meteor';
import './imports/publications/blogs.ts';
import './imports/publications/blog-comments.ts';
import './imports/publications/posts.ts';
import './imports/publications/post-comments.ts';
import './imports/publications/users.ts';
import { loadUsers } from './fixtures/users';

import { startServiceConfiguration } from './imports/service-configuration';
import { startSmtpConfiguration } from './imports/smtp';

Meteor.startup(() => {
    startServiceConfiguration();
    startSmtpConfiguration();
    loadUsers();
});