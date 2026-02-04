import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  UserInformationStore,
  UserInformation,
  ApiResponse,
  CreateUserInformationInput,
} from "../types/userInfomation.type";
import { API } from "../constants/apiPath";
import { ActionResultValue } from "../types/ActionResult";

const useUserInformationStore = create<UserInformationStore>((set) => ({
  userInformation: null,
  loading: false,
  status: false,
  message: "",

  fetchUserInformation: async (usersInformationId: string) => {
    set({ loading: true });
    try {
      const res = await serverApi.get(
        API.USER_INFORMATION.GET_BY_ID(usersInformationId),
      );
      set({ userInformation: res.data.data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createInformation: async (
    data: UserInformation,
  ): Promise<ActionResultValue> => {
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
  ): Promise<ActionResultValue> => {
    set({ loading: true });
    type UserInformationUpdatePayload = Omit<
      UserInformation,
      "id" | "createdAt" | "updatedAt"
    >;

    // 2️⃣‑ฟังก์ชันทำ “clean‑up” (อาจสร้างไว้ข้างบนก็ได้)
    const sanitizeUserInformation = (
      user: UserInformation,
    ): UserInformationUpdatePayload => {
      const { id, createdAt, updatedAt, ...rest } = user;
      return rest;
    };
    try {
      const payload = sanitizeUserInformation(data);

      const res = await serverApi.put<ApiResponse<CreateUserInformationInput>>(
        API.USER_INFORMATION.UPDATE(id),
        payload,
      );

      set({
        userInformation: res.data.data,
        status: res.data.success,
        message: res.data.message || "",
      });
      console.log(payload, "payload");
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

  updateAppoved: async (
    approvedStatus: string,
    id: string,
  ): Promise<ActionResultValue> => {
    set({ loading: true });

    try {
      const res = await serverApi.put<ApiResponse<UserInformation>>(
        API.USER_INFORMATION.UPDATE(id),
        {
          status: approvedStatus,
        },
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
