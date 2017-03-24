import { CollectionObject } from './collection-object.model';

export interface Log extends CollectionObject {
    type: string;
    detail: string;
    owner: string;
    createdAt: Date;
}