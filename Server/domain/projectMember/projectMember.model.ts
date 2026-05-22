export type MemberRole = "owner" | "member" | "contributor";
export type MemberStatus = "active" | "pending" | "rejected";

export interface IProjectMember {
  id?: string;
  projectId: string;
  userId: string;
  role: MemberRole;
  status: MemberStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
