import { create } from "zustand";
import { serverApi } from "../services/api";
// const token = localStorage.getItem("next-auth.session-token");

import type {
  LoginPayload,
  LoginStore,
  RegisterPayload,
  RegisterStore,
  User,
  UserListStore,
} from "../types/user.type";
import { API } from "../constants/apiPath";
import { createSecurePayload } from "./createSecurePayload";
let isFetchingUsers = false;

const useUserStore = create<UserListStore>((set, get) => ({
  users: [],
  userDeail: null,
  user: null,
  loading: false,
  loadingUsers: false, // 👈 แยก
  page: 0,
  pageSize: 10,
  total: 0,
  userStatus: null,

  setPagination: (page: number, pageSize: number) =>
    set((state) => ({
      page,
      pageSize,
    })),

  fetchUsers: async (roleSecret: string, token: string) => {
    const { total, page, pageSize, loadingUsers } = get();

    console.log("🧪 fetchUsers called, loadingUsers =", loadingUsers);

    if (loadingUsers) return;

    set({ loadingUsers: true });

    try {
      const { encryptedPayload, signature, timestamp } = createSecurePayload(
        { page, pageSize },
        roleSecret,
      );

      const res = await serverApi.post(
        API.USER.GET_ALL,
        { payload: encryptedPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-timestamp": timestamp,
            "x-signature": signature,
          },
        },
      );

      set({ users: res.data.data, total, userStatus: res.data.status });
      console.log(res.data.status, "res.data.status");
    } catch (err) {
      console.error("fetchUsers error:", err);
    } finally {
      set({ loadingUsers: false });
    }
  },

  fetchUser: async (id: string, token: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(
        API.USER.GET_BY_ID(id),
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );

      set({ user: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserDetail: async (id: string, token: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(
        API.USER.GET_BY_ID(id),
        {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // },
      );
      const detail = res.data.usersInformation;

      set({ userDeail: detail });

      return detail; // *** คืนค่ากลับไปให้คนเรียกใช้ ***
    } catch (err) {
      console.error(err);
      return null;
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
