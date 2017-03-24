import { CollectionObject } from './collection-object.model';

export interface Blog extends CollectionObject {
    title: string;
    description: string;
    content: Location;
    owner: string;
    public: boolean;
    createdAt: Date;
}