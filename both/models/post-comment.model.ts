import { CollectionObject } from './collection-object.model';

export interface PostComment extends CollectionObject {
    postId: string;
    content: string;
    owner: string;
    public: boolean;
    createdAt: Date;
}