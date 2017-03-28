import { MongoObservable } from 'meteor-rxjs';
import { Post } from '../models/post.model';

export const Posts = new MongoObservable.Collection<Post>('posts');

function allow() {
    return false;
}

Posts.allow({
    insert: allow,
    update: allow,
    remove: allow
});