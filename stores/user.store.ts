import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  LoginPayload,
  LoginStore,
  RegisterPayload,
  RegisterStore,
  User,
  UserListStore,
} from "../types/user.type";
import { API } from "../constants/apiPath";

const useGetUserStore = create<UserListStore>((set) => ({
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

interface UserStore {
  user: User | null;
  setUser: (u: User) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  logout: () => set({ user: null }),
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

const useRegisterStore = create<RegisterStore>((set) => ({
  user: null,
  loading: false,

  register: async (payload) => {
    set({ loading: true });

    try {
      const res = await serverApi.post(API.AUTH.REGISTER, payload);
      set({ user: res.data.data });
      return res.data.data;
    } catch (err) {
      console.error("Register error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export { useGetUserStore, useUserStore, useLoginStore, useRegisterStore };
