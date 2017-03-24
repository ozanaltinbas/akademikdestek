import { MongoObservable } from 'meteor-rxjs';
import { Comment } from '../models/comment.model';

export const Comments = new MongoObservable.Collection<Comment>('comments');

function allow() {
    return false;
}

Comments.allow({
    insert: allow,
    update: allow,
    remove: allow
});