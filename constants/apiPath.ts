export const API = {
  AUTH: {
    LOGIN: "/login",
    LOGIN_GOOGLE: "/loginGoogle",
    REGISTER: "/register",
  },

  USER: {
    GET_ALL: "/users",
    GET_BY_ID: (id: string) => `/user/${id}`,
  },

  USER_INFORMATION: {
    GET_BY_ID: "/information/user",
    CREATE: "/information",
    UPDATE: (id: string) => `/information/${id}`,
  },

  UPLOAD: {
    FILE: "/upload/single",
    FILE_MULTIPLE: "/upload/multi",
  },

  ADDRESS_DROPDOWN: {
    province: "/provinces",
    district: (provinceCode: string) =>
      `/districts?provinceCode=${provinceCode}`,
    subdistrict: (districtCode: string) =>
      `/subdistricts?districtCode=${districtCode}`,
  },
};
