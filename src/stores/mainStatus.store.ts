import { create } from "zustand";
import { API } from "../constants/apiPath";
import { serverApi } from "../services/api";
import { StatusMain, StatusMainStore } from "../types/MainStatus.type";

const useStatusMainStore = create<StatusMainStore>((set) => ({
  mainStatus: null,
  loading: false,

  fetchStatus: async (id: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(API.MAIN_STATUS.GET_BY_ID(id));

      const detail: StatusMain = res.data.data[0];
      console.log(detail, "mainStatus");
      set({ mainStatus: detail });
      return detail;
    } catch (err) {
      console.error("fetchStatus error:", err);
      set({ mainStatus: null });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));

export { useStatusMainStore };
