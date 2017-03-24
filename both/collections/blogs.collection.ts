import { MongoObservable } from 'meteor-rxjs';
import { Blog } from '../models/blog.model';

export const Blogs = new MongoObservable.Collection<Blog>('blogs');

function allow() {
    return false;
}

Blogs.allow({
    insert: allow,
    update: allow,
    remove: allow
});