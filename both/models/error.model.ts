import { CollectionObject } from './collection-object.model';

export interface Error extends CollectionObject {
    error: string;
    reason?: string;
    details?: string;
    owner: string;
    createdAt: Date;
}