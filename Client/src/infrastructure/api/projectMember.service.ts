import { apiClient } from './axios.config';

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  user?: { id: string; fullName: string; avatar?: string; headline?: string };
  role: 'owner' | 'member' | 'contributor';
  status: 'active' | 'pending' | 'rejected';
  createdAt: string;
}

export class ProjectMemberService {
  static async requestToJoin(projectId: string) {
    const res = await apiClient.post(`/api/v1/projects/${projectId}/join`);
    return res.data;
  }

  static async getMembers(projectId: string) {
    const res = await apiClient.get(`/api/v1/projects/${projectId}/members`);
    return res.data;
  }

  static async approveMember(id: string) {
    const res = await apiClient.put(`/api/v1/members/${id}/approve`);
    return res.data;
  }

  static async rejectMember(id: string) {
    const res = await apiClient.put(`/api/v1/members/${id}/reject`);
    return res.data;
  }

  static async removeMember(id: string) {
    const res = await apiClient.delete(`/api/v1/members/${id}`);
    return res.data;
  }
}
