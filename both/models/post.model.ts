import { CollectionObject } from './collection-object.model';

export interface Post extends CollectionObject {
    title: string;
    content: string;
    indexTitle: string;
    owner: string;
    public: boolean;
    createdAt: Date;
}