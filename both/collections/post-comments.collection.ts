import { MongoObservable } from 'meteor-rxjs';
import { PostComment } from '../models/post-comment.model';

export const PostComments = new MongoObservable.Collection<PostComment>('postComments');

function allow() {
    return false;
}

PostComments.allow({
    insert: allow,
    update: allow,
    remove: allow
});