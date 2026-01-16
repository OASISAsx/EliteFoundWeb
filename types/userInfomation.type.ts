import { Dayjs } from "dayjs";

export interface UserInformation {
  id?: string;

  firstName: string;
  lastName: string;
  citizenId: string;
  dateOfBirth: Date;

  gender?: string | null;
  nationality?: string | null;
  maritalStatus?: string | null;

  phone: string;
  email?: string | null;
  lineId?: string | null;
  facebook?: string | null;

  currentAddress: string;
  registeredAddress?: string | null;
  province: string;
  district: string;
  zipcode: string;

  occupation: string;
  companyName?: string | null;
  companyAddress?: string | null;
  position?: string | null;
  salaryPerMonth: number;
  otherIncome?: number | null;
  workYears: number;
  employmentType: string; // fulltime | freelance | business

  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;

  monthlyExpense: number;
  existingDebt: boolean;
  debtAmount?: number | null;
  debtInstallmentPerMonth?: number | null;

  kycStatus: string; // pending | approved | rejected
  creditScore?: number | null;
  riskLevel?: string | null;

  loanStatus: string; // pending | approved | rejected

  id_card_image: string;

  selfie_with_id: string;
  salary_slip: string;
  bank_statement: string;
  house_document: string;
  other_files: string[];

  createdAt: Date;
  updatedAt: Date;
}
export interface CreateUserInformationInput {
  firstName: string;
  lastName: string;
  citizenId: string;
  dateOfBirth: Date;

  gender: string;
  nationality?: string | null;
  maritalStatus?: string | null;

  phone: string;
  email?: string | null;
  lineId?: string | null;
  facebook?: string | null;

  currentAddress: string;
  registeredAddress?: string | null;
  province: string;
  district: string;
  zipcode: string;

  occupation: string;
  companyName?: string | null;
  companyAddress?: string | null;
  position?: string | null;
  salaryPerMonth: number;
  otherIncome?: number | null;
  workYears: number;
  employmentType: string; // fulltime | freelance | business

  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;

  monthlyExpense: number;
  existingDebt: boolean;
  debtAmount?: number | null;
  debtInstallmentPerMonth?: number | null;

  kycStatus?: string; // default = pending
  creditScore?: number | null;
  riskLevel?: string | null;

  loanStatus?: string; // default = pending

  id_card_image: string;
  idCardFile: File | null;
  selfie_with_id: string;
  salary_slip: string[];
  bank_statement: string;
  house_document: string;
  other_files: string[];
  salarySlipUpload: File[];
}

export interface UserInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;
  fetchUserInformation: (userId: string) => Promise<void>;
}

export interface UpdateInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;
  updateUserInformation: (
    userId: string,
    data: UserInformation
  ) => Promise<void>;
}

export interface CreateInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;
  createInformation: (data: UserInformation) => Promise<void>;
}
