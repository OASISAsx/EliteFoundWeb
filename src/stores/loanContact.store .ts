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
import { createSecurePayload } from "./createSecurePayload";

const useLoanContactStore = create<UserloanContactStore>((set, get) => ({
  LoanContract: null,
  dataLoan: [],
  loading: false,
  status: false,
  message: "",
  page: 0,
  pageSize: 10,
  rowCount: 0,
  loadingAllLoan: false,
  mainStatus: null,

  setPagination: (page: number, pageSize: number) =>
    set((state) => ({
      page,
      pageSize,
    })),

  fetchAllLoan: async (
    page: number,
    pageSize: number,
    roleSecret: string,
    token: string,
  ) => {
    if (get().loadingAllLoan) return;
    set({ loadingAllLoan: true });
    console.log(page, pageSize, "fetchAllLoan");
    try {
      const { encryptedPayload, signature, timestamp } = createSecurePayload(
        {
          page: page + 1, // backend 1-based
          limit: pageSize,
        },
        roleSecret,
      );

      const res = await serverApi.post(
        API.LOANCONTACT.GET_ALL,
        { payload: encryptedPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-timestamp": timestamp,
            "x-signature": signature,
          },
        },
      );

      set({
        dataLoan: res.data.data,
        rowCount: res.data.meta.total,
        mainStatus: res.data.status,
        page,
        pageSize,
      });
    } finally {
      set({ loadingAllLoan: false });
    }
  },
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
