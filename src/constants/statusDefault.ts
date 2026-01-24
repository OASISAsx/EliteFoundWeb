export const LOAN_STATUS_CONFIG = [
  "PENDING",
  "APPROVED",
  "ACTIVE",
  "COMPLETED",
  "REJECTED",
] as const;

export type LoanStatus = (typeof LOAN_STATUS_CONFIG)[number];
