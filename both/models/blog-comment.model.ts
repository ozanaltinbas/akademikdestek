import { CollectionObject } from './collection-object.model';

export interface BlogComment extends CollectionObject {
    blogId: string;
    content: string;
    indexContent: string;
    owner: string;
    public: boolean;
    createdAt: Date;
}