export interface LoanRepayment {
  id: string;
  installmentNo: number;
  dueDate: string;
  dueMonth: string;
  principal: number;
  interest: number;
  total: number;
  balance: number;
  status: "unpaid" | "paid" | "late";
  paidAmount: number | null;
  paidAt: string | null;
  loanContractId: string;
  createdAt: string;
}
