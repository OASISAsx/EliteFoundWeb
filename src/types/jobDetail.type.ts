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
  // fetchUserInformation: (userId: string) => Promise<void>;
  createJobDetail: (data: JobDetail) => Promise<void>;
  updateJobDetail: (data: JobDetail, id: string) => Promise<void>;
}
