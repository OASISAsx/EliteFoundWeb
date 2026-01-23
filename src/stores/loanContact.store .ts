import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  ApiResponseJob,
  JobDetail,
  UserjobDetailStore,
} from "../types/jobDetail.type";
import { API } from "@/src/constants/apiPath";
import {
  ApiResponseLoan,
  CreateLoanContractBody,
  LoanContract,
  UserloanContactStore,
} from "../types/loanContact";

const useLoanContactStore = create<UserloanContactStore>((set) => ({
  LoanContract: null,
  dataLoan: [],
  loading: false,
  status: false,
  message: "",

  fetchLoan: async (id: string) => {
    set({ loading: true });

    try {
      const res = await serverApi.get(API.LOANCONTACT.GET_BY_ID(id));

      set({ dataLoan: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createLoanContact: async (data: CreateLoanContractBody): Promise<boolean> => {
    set({ loading: true });

    try {
      const res = await serverApi.post<ApiResponseLoan<LoanContract>>(
        API.LOANCONTACT.CREATE,
        data,
      );

      set({
        LoanContract: res.data.data,
        status: res.data.success,
        message: res.data.message,
      });

      return res.data.success;
    } catch (err) {
      set({ status: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateLoanContact: async (
    data: CreateLoanContractBody,
    id: string,
  ): Promise<boolean> => {
    set({ loading: true });

    try {
      const res = await serverApi.put<ApiResponseLoan<CreateLoanContractBody>>(
        API.LOANCONTACT.UPDATE(id),
        data,
      );

      set({
        // LoanContract: res.data.data,
        status: res.data.success,
        message: res.data.message,
      });

      return res.data.success;
    } catch (err) {
      set({ status: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export { useLoanContactStore };
