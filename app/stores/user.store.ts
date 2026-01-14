import { create } from "zustand";
import { serverApi } from "../services/api";
import type { LoginStore, UserListStore } from "../types/user.type";
import { API } from "../constants/apiPath";

const useUserStore = create<UserListStore>((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });

    try {
      const res = await serverApi.get(API.USER.GET_ALL);
      set({ users: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));

const useLoginStore = create<LoginStore>((set) => ({
  user: null,
  loading: false,

  login: async (payload) => {
    set({ loading: true });

    try {
      const res = await serverApi.post(API.AUTH.LOGIN, payload);

      set({
        user: res.data.data,
      });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      set({ loading: false });
    }
  },

  logout: () => set({ user: null }),
}));

export { useUserStore, useLoginStore };
