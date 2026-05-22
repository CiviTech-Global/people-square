import { apiClient } from './axios.config';

export interface InvestmentInterest {
  id: string;
  investorId: string;
  investor?: { id: string; fullName: string; avatar?: string };
  projectId: string;
  project?: { id: string; title: string; description: string };
  message?: string;
  status: 'expressed' | 'in-discussion' | 'committed' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
}

export class InvestmentInterestService {
  static async expressInterest(projectId: string, message?: string) {
    const res = await apiClient.post(`/api/v1/investments/projects/${projectId}/interest`, { message });
    return res.data;
  }

  static async getProjectInterests(projectId: string) {
    const res = await apiClient.get(`/api/v1/investments/projects/${projectId}/interests`);
    return res.data;
  }

  static async getMyPortfolio() {
    const res = await apiClient.get(`/api/v1/investments/portfolio`);
    return res.data;
  }

  static async updateStatus(id: string, status: string) {
    const res = await apiClient.put(`/api/v1/investments/${id}/status`, { status });
    return res.data;
  }
}
