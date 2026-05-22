export interface IComment {
  id?: string;
  content: string;
  authorId: string;
  projectId: string;
  parentId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
