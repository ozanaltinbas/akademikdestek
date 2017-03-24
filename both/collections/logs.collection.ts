import { MongoObservable } from 'meteor-rxjs';
import { Log } from '../models/log.model';

export const Logs = new MongoObservable.Collection<Log>('logs');

function allow() {
    return false;
}

Logs.allow({
    insert: allow,
    update: allow,
    remove: allow
});