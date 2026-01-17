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

const useUserStore = create<UserListStore>((set, get) => ({
  users: [],
  userDeail: null,
  user: null,
  loading: false,
  page: 1,
  limit: 10,

  fetchUsers: async () => {
    const { page, limit } = get();

    set({ loading: true });

    try {
      const res = await serverApi.get(API.USER.GET_ALL, {
        params: { page, limit },
      });

      set({ users: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  fetchUser: async (id: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(API.USER.GET_BY_ID(id));
      set({ user: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserDetail: async (id: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(API.USER.GET_BY_ID(id));
      set({ userDeail: res.data.data.usersInformation });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  setUser: (u) => set({ user: u }),

  logout: () => set({ user: null }),

  setPage: (p) => set({ page: p }),
}));

// interface UserStore {
//   user: User | null;
//   setUser: (u: User) => void;
//   logout: () => void;
// }

// const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   setUser: (u) => set({ user: u }),
//   logout: () => set({ user: null }),
// }));

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

export { useUserStore, useLoginStore, useRegisterStore };
