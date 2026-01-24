export interface StatusMain {
  id?: string;
  usersInformationId?: string;

  totalContracts?: number;
  pendingAmount?: number;
  approvedContracts?: number;
  approvedAmount?: number;
  usedAmount?: number;
  loanAmount?: number;
  approvalRate?: number;

  lastUpdatedAt?: string;
}

export interface StatusMainStore {
  mainStatus: StatusMain | null;
  loading: boolean;
  fetchStatus: (id: string) => Promise<StatusMain | null>;
}
