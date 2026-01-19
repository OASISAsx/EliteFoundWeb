import { create } from "zustand";
import { serverApi } from "../services/api";
import type { JobDetail, UserjobDetailStore } from "../types/jobDetail.type";
import { API } from "@/src/constants/apiPath";

const useUserJobDetailnStore = create<UserjobDetailStore>((set) => ({
  jobDetail: null,
  loading: false,
  status: false,

  createJobDetail: async (data: JobDetail) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(API.JOB_DETAIL.CREATE, data);
      set({ jobDetail: res.data.data });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateJobDetail: async (data: JobDetail, id: string) => {
    set({ loading: true });
    try {
      const { ...rest } = data;

      const res = await serverApi.put(API.JOB_DETAIL.UPDATE(id), rest);

      set({ jobDetail: res.data.data, status: res.data.success });
    } catch (err) {
      console.error(err);
      console.error("Update error:", err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export { useUserJobDetailnStore };
