import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  ApiResponseJob,
  JobDetail,
  UserjobDetailStore,
} from "../types/jobDetail.type";
import { API } from "@/src/constants/apiPath";
import { ApiResponse } from "../types/userInfomation.type";

const useUserJobDetailnStore = create<UserjobDetailStore>((set) => ({
  jobDetail: null,
  loading: false,
  status: false,
  message: "",
  createJobDetail: async (data: JobDetail): Promise<boolean> => {
    set({ loading: true });

    try {
      const res = await serverApi.post<ApiResponseJob<JobDetail>>(
        API.JOB_DETAIL.CREATE,
        data,
      );

      set({
        jobDetail: res.data.data,
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

  updateJobDetail: async (data: JobDetail, id: string): Promise<boolean> => {
    set({ loading: true });

    try {
      const res = await serverApi.put<ApiResponseJob<JobDetail>>(
        API.JOB_DETAIL.UPDATE(id),
        data,
      );

      set({
        jobDetail: res.data.data,
        status: res.data.success,
        message: res.data.message,
      });

      return res.data.success; // 🔥 สำคัญ
    } catch (err) {
      set({ status: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export { useUserJobDetailnStore };
