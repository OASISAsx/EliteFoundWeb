import { LoanRepayment } from "./LoanRepayment.type";

export interface LoanContract {
  id: string;
  loanAmount: number;
  interestRate: number;
  termMonths: number;
  installmentPerMonth: number;
  loanType: "effective" | "flat";
  status: "panding" | "closed" | "cancelled";
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

export interface Status {
  ACTIVE: 0;
  APPROVED: 0;
  COMPLETED: 0;
  PENDING: 0;
  REJECTED: 0;
}

export interface UserloanContactStore {
  LoanContract?: LoanContract | null;
  dataLoan: LoanContract[];
  mainStatus: null;
  loading: boolean;
  status: boolean;
  message?: string;
  loadingAllLoan: boolean;
  page: number;
  pageSize: number;
  rowCount: number;
  fetchLoan: (id: string) => Promise<void>;
  fetchAllLoan: (
    page: number,
    pageSize: number,
    roleSecret: string,
    token: string,
  ) => Promise<void>;
  createLoanContact: (data: CreateLoanContractBody) => Promise<boolean>;
  setPagination: (page: number, pageSize: number) => void;
  updateLoanContact: (
    data: CreateLoanContractBody,
    id: string,
  ) => Promise<boolean>;
  updateAdminAppoved: (status: string, id: string) => Promise<boolean>;
}

export interface ApiResponseLoan<T> {
  success: boolean;
  message: string;
  data: T;
}
