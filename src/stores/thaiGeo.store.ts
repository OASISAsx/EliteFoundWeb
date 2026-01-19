import { create } from "zustand";
import { API } from "@/src/constants/apiPath";
import { serverApi } from "@/src/services/api";

export const useThaiGeoStore = create<ThaiGeoStore>((set) => ({
  provinces: [],
  districts: [],
  subdistricts: [],

  fetchProvinces: async () => {
    const res = await serverApi.get(API.ADDRESS_DROPDOWN.province);
    set({ provinces: res.data.data });
  },

  fetchDistricts: async (provinceCode: string) => {
    const res = await serverApi.get(
      API.ADDRESS_DROPDOWN.district(provinceCode),
    );
    set({ districts: res.data.data });
  },

  fetchSubdistricts: async (districtCode: string) => {
    const res = await serverApi.get(
      API.ADDRESS_DROPDOWN.subdistrict(districtCode),
    );
    set({ subdistricts: res.data.data });
  },

  clearDistricts: () => set({ districts: [] }),
  clearSubdistricts: () => set({ subdistricts: [] }),
}));
