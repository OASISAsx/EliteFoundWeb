import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  UserInformationStore,
  UserInformation,
  ApiResponse,
} from "../types/userInfomation.type";
import { API } from "../constants/apiPath";

const useUserInformationStore = create<UserInformationStore>((set) => ({
  userInformation: null,
  loading: false,
  status: false,
  message: "",
  fetchUserInformation: async (userId: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(API.USER_INFORMATION.GET_BY_ID(userId));
      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createInformation: async (data: UserInformation): Promise<ActionResult> => {
    set({ loading: true });

    try {
      const res = await serverApi.post(API.USER_INFORMATION.CREATE, data);

      return {
        success: res.data.success,
        message: res.data.message || "",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.response?.data?.message || "เกิดข้อผิดพลาด",
      };
    } finally {
      set({ loading: false });
    }
  },

  updateInformation: async (
    data: UserInformation,
    id: string,
  ): Promise<ActionResult> => {
    set({ loading: true });

    try {
      const { userId, JobDetail, bankInformation, ...rest } = data;

      const res = await serverApi.put<ApiResponse<UserInformation>>(
        API.USER_INFORMATION.UPDATE(id),
        rest,
      );

      set({
        userInformation: res.data.data,
        status: res.data.success,
        message: res.data.message || "",
      });

      return {
        success: res.data.success,
        message: res.data.message || "",
      };
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Update failed";

      set({
        status: false,
        message: msg,
      });

      return {
        success: false,
        message: msg,
      };
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
