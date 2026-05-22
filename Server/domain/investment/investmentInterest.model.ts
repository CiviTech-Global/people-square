export type InvestmentInterestStatus =
  | "expressed"
  | "in-discussion"
  | "committed"
  | "withdrawn";

export interface IInvestmentInterest {
  id?: string;
  investorId: string;
  projectId: string;
  message?: string | null;
  status: InvestmentInterestStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
