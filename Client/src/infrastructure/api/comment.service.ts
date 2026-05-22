import { apiClient } from './axios.config';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: { id: string; fullName: string; avatar?: string };
  projectId: string;
  parentId?: string | null;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export class CommentService {
  static async getComments(projectId: string, page = 1, limit = 20) {
    const res = await apiClient.get(`/api/v1/projects/${projectId}/comments`, { params: { page, limit } });
    return res.data;
  }

  static async createComment(projectId: string, content: string, parentId?: string) {
    const res = await apiClient.post(`/api/v1/projects/${projectId}/comments`, { content, parentId });
    return res.data;
  }

  static async updateComment(id: string, content: string) {
    const res = await apiClient.put(`/api/v1/comments/${id}`, { content });
    return res.data;
  }

  static async deleteComment(id: string) {
    const res = await apiClient.delete(`/api/v1/comments/${id}`);
    return res.data;
  }
}
