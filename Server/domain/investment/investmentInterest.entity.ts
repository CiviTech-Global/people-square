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

export type InvestmentInterestStatus =
  | "expressed"
  | "in-discussion"
  | "committed"
  | "withdrawn";

@Entity("investment_interests")
export class InvestmentInterest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  investorId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "investorId" })
  investor!: User;

  @Column({ type: "uuid" })
  projectId!: string;

  @ManyToOne(() => Project, { onDelete: "CASCADE" })
  @JoinColumn({ name: "projectId" })
  project!: Project;

  @Column({ type: "text", nullable: true })
  message?: string | null;

  @Column({
    type: "enum",
    enum: ["expressed", "in-discussion", "committed", "withdrawn"],
    default: "expressed",
  })
  status!: InvestmentInterestStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
