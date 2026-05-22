import { apiClient } from './axios.config';

export class BookmarkService {
  static async toggle(projectId: string) {
    const res = await apiClient.post(`/api/v1/bookmarks/projects/${projectId}/bookmark`);
    return res.data;
  }

  static async getMyBookmarks() {
    const res = await apiClient.get(`/api/v1/bookmarks`);
    return res.data;
  }

  static async checkBookmark(projectId: string) {
    const res = await apiClient.get(`/api/v1/bookmarks/projects/${projectId}/bookmark`);
    return res.data;
  }
}
