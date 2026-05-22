import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Project } from "../project/project.entity";

export type MemberRole = "owner" | "member" | "contributor";
export type MemberStatus = "active" | "pending" | "rejected";

@Entity("project_members")
export class ProjectMember {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({
    type: "enum",
    enum: ["owner", "member", "contributor"],
    default: "member",
  })
  role!: MemberRole;

  @Column({
    type: "enum",
    enum: ["active", "pending", "rejected"],
    default: "pending",
  })
  status!: MemberStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  toJSON() {
    const { project, ...member } = this as any;
    return member;
  }
}
