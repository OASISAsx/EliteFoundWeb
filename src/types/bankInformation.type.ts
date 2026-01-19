import { UserInformation } from "./userInfomation.type";

export interface BankInformation {
  id?: string;

  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranch?: string | null;
  accountType?: string | null;

  monthlyIncome?: number;
  monthlyExpense?: number;
  balanceEstimate?: number | null;

  existingDebt?: boolean;
  debtInstallmentPerMonth?: number | null;

  riskLevel?: string | null;
  kycStatus?: string;

  bankStatementFiles: string[];
  passbookImage?: string | null;

  usersInformationId?: string;
}

export interface BankCrateAndUpdate {
  id?: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranch?: string | null;
  accountType?: string | null;

  monthlyIncome?: number;
  monthlyExpense?: number;
  balanceEstimate?: number | null;

  debtInstallmentPerMonth?: number | null;

  bankStatementFiles: string[];
  passbookImage?: string | null;
  usersInformation?: UserInformation | null;
  usersInformationId?: string;
}

// export type CreateBankInput = Omit<BankInformation, "id" | "usersInformation">;

// export type UpdateBankInput = Partial<CreateBankInput>;

export interface UserBankStore {
  BankInformation: BankInformation | null;
  loading: boolean;
  fetchUser: (id: string) => Promise<void>;
  createBank: (data: BankCrateAndUpdate) => Promise<void>;
  updateBank: (data: BankCrateAndUpdate, id: string) => Promise<void>;
}
