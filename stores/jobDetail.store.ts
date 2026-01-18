import { create } from "zustand";
import { serverApi } from "../services/api";
import type { JobDetail, UserjobDetailStore } from "../types/jobDetail.type";
import { API } from "@/constants/apiPath";

const useUserJobDetailnStore = create<UserjobDetailStore>((set) => ({
  jobDetail: null,
  loading: false,
  //   fetchUserInformation: async (userId: string) => {
  //     set({ loading: true });
  //     try {
  //       const res = await serverApi.post(
  //         `${API.USER_INFORMATION.GET_BY_ID}/${userId}`,
  //       );
  //       set({ userInformation: res.data.data });
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       set({ loading: false });
  //     }
  //   },

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

      set({ jobDetail: res.data.data });
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
