export interface JobDetail {
  id?: string;
  occupation: string;
  companyName: string;
  companyAddress: string;
  position: string;
  salaryPerMonth: number;
  otherIncome: number;
  workYears: number;
  employmentType: string;
  salarySlip: string[];
  usersInformationId?: string;
  startDate?: Date;
}

export interface UserjobDetailStore {
  jobDetail: JobDetail | null;
  loading: boolean;
  status: boolean;
  message?: string;
  createJobDetail: (data: JobDetail) => Promise<boolean>;
  updateJobDetail: (data: JobDetail, id: string) => Promise<boolean>;
}

export interface ApiResponseJob<T> {
  success: boolean;
  message: string;
  data: T;
}
