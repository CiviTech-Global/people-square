export type UserRole = "startup-owner" | "investor" | "organization" | "citizen";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  role: UserRole;
  password: string;
  avatar?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
  headline?: string | null;
  socialLinks?: SocialLinks | null;
  profileCompleted?: boolean;
  location?: string | null;
  company?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
