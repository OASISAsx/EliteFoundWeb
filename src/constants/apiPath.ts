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
    GET_BY_ID: (id: string) => `/information/${id}`,
    CREATE: "/information",
    UPDATE: (id: string) => `/information/${id}`,
  },

  JOB_DETAIL: {
    // GET_BY_ID: "/information/user",
    CREATE: "/jobDetail",
    UPDATE: (id: string) => `/jobDetail/${id}`,
  },

  BANKINFORMATION: {
    GET_BY_ID: (id: string) => `/BankInformation/${id}`,
    CREATE: "/BankInformation",
    UPDATE: (id: string) => `/BankInformation/${id}`,
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
