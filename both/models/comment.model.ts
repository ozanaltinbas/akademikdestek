import { CollectionObject } from './collection-object.model';

export interface Comment extends CollectionObject {
    blogId: string;
    content: string;
    owner: string;
    public: boolean;
    createdAt: Date;
}