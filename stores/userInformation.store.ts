import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  UserInformationStore,
  UserInformation,
} from "../types/userInfomation.type";
import { API } from "../constants/apiPath";

const useUserInformationStore = create<UserInformationStore>((set) => ({
  userInformation: null,
  loading: false,
  fetchUserInformation: async (userId: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.post(
        `${API.USER_INFORMATION.GET_BY_ID}/${userId}`,
      );
      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createInformation: async (data: UserInformation) => {
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

  updateInformation: async (data: UserInformation, id: string) => {
    set({ loading: true });
    try {
      const { userId, JobDetail, ...rest } = data;

      const res = await serverApi.put(API.USER_INFORMATION.UPDATE(id), rest);

      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
      console.error("Update error:", err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

// const useCreateUserInformationStore = create<CreateInformationStore>((set) => ({
//   userInformation: null,
//   loading: false,
//   createInformation: async (data: UserInformation) => {
//     set({ loading: true });
//     try {
//       const res = await serverApi.post(API.USER_INFORMATION.CREATE, data);
//       set({ userInformation: res.data.data });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

export { useUserInformationStore };
