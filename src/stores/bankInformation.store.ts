import { create } from "zustand";
import { serverApi } from "../services/api";
import type { UserBankStore } from "../types/bankInformation.type";
import { API } from "@/src/constants/apiPath";

const useUserUserBankStore = create<UserBankStore>((set) => ({
  bankData: null,
  loading: false,

  fetchBank: async (usersInformationId) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(
        API.BANKINFORMATION.GET_BY_ID(usersInformationId),
      );
      set({ bankData: res.data.data });
    } finally {
      set({ loading: false });
    }
  },

  createBank: async (data) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(API.BANKINFORMATION.CREATE, data);
      set({ bankData: res.data.data });
    } finally {
      set({ loading: false });
    }
  },

  updateBank: async (data, id) => {
    set({ loading: true });
    try {
      const { usersInformation, usersInformationId, ...rest } = data;
      const res = await serverApi.put(API.BANKINFORMATION.UPDATE(id), rest);
      set({ bankData: res.data.data });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserUserBankStore;
