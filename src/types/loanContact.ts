import { LoanRepayment } from "./LoanRepayment.type";

export interface LoanContract {
  id: string;
  loanAmount: number;
  interestRate: number;
  termMonths: number;
  installmentPerMonth: number;
  loanType: "effective" | "flat";
  status: "active" | "closed" | "cancelled";
  startDate: string;
  usersInformationId: string;
  createdAt: string;
  repayments: LoanRepayment[];
}

export interface CreateLoanContractBody {
  loanAmount?: number | null;
  interestRate?: number | null;
  termMonths?: number | null;
  loanType?: "effective" | "flat";
  startDate?: string | Date;
  usersInformationId?: string | null;
}

export interface UserloanContactStore {
  LoanContract: LoanContract | null;
  loading: boolean;
  status: boolean;
  message?: string;
  createLoanContact: (data: CreateLoanContractBody) => Promise<boolean>;
  updateLoanContact: (
    data: CreateLoanContractBody,
    id: string,
  ) => Promise<boolean>;
}

export interface ApiResponseLoan<T> {
  success: boolean;
  message: string;
  data: T;
}
