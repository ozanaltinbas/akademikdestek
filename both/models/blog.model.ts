import { CollectionObject } from './collection-object.model';

export interface Blog extends CollectionObject {
    title: string;
    subtitle: string;
    content: string;
    owner: string;
    public: boolean;
    createdAt: Date;
}