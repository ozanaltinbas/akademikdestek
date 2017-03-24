import { MongoObservable } from 'meteor-rxjs';
import { Error } from '../models/error.model';

export const Errors = new MongoObservable.Collection<Error>('errors');

function allow() {
    return false;
}

Errors.allow({
    insert: allow,
    update: allow,
    remove: allow
});