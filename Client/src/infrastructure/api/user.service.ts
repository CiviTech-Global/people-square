import { apiClient } from "./axios.config";
import type { SocialLinks } from "../../application/context/AuthContext";

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  role?: string;
}

export interface CompleteProfileData {
  bio?: string;
  headline?: string;
  skills?: string[];
  interests?: string[];
  socialLinks?: SocialLinks;
  location?: string;
  company?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    avatar?: string | null;
    bio?: string | null;
    skills?: string[] | null;
    interests?: string[] | null;
    headline?: string | null;
    socialLinks?: SocialLinks | null;
    profileCompleted?: boolean;
    location?: string | null;
    company?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export class UserService {
  public static async updateProfile(userId: string, data: UpdateUserData): Promise<UserResponse> {
    const response = await apiClient.put<UserResponse>(`/api/v1/users/${userId}`, data);
    return response.data;
  }

  public static async getProfile(userId: string): Promise<UserResponse> {
    const response = await apiClient.get<UserResponse>(`/api/v1/users/${userId}`);
    return response.data;
  }

  public static async completeProfile(userId: string, data: CompleteProfileData): Promise<UserResponse> {
    const response = await apiClient.put<UserResponse>(`/api/v1/users/${userId}/profile`, data);
    return response.data;
  }

  public static async uploadAvatar(userId: string, file: File): Promise<UserResponse> {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await apiClient.post<UserResponse>(`/api/v1/users/${userId}/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  public static async searchUsers(query: string, role?: string): Promise<any> {
    const params: any = { q: query };
    if (role) params.role = role;
    const response = await apiClient.get("/api/v1/users/search", { params });
    return response.data;
  }

  public static async getUsersByRole(role: string): Promise<any> {
    const response = await apiClient.get(`/api/v1/users/role/${role}`);
    return response.data;
  }
}
