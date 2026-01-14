import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  CreateInformationStore,
  UpdateInformationStore,
  UserInformationStore,
  UsersInformation,
} from "../types/userInfomation.type";
import { API } from "../constants/apiPath";

const useUserInformationStore = create<UserInformationStore>((set) => ({
  userInformation: null,
  loading: false,
  fetchUserInformation: async (userId: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(
        `${API.USER_INFORMATION.GET_BY_ID}/${userId}`
      );
      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));

const useCreateUserInformationStore = create<CreateInformationStore>((set) => ({
  userInformation: null,
  loading: false,
  createInformation: async (data: UsersInformation) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(API.USER_INFORMATION.CREATE, data);
      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));

export { useUserInformationStore, useCreateUserInformationStore };
