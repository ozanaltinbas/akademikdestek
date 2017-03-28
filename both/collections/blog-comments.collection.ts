import { MongoObservable } from 'meteor-rxjs';
import { BlogComment } from '../models/blog-comment.model';

export const BlogComments = new MongoObservable.Collection<BlogComment>('blogComments');

function allow() {
    return false;
}

BlogComments.allow({
    insert: allow,
    update: allow,
    remove: allow
});