export const API = {
  AUTH: {
    LOGIN: "auth/login",
    LOGIN_GOOGLE: "/loginGoogle",
    REGISTER: "auth/register",
  },

  USER: {
    GET_ALL: "/usersAll",
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

  LOANCONTACT: {
    GET_ALL: "/loanContactAll",
    GET_BY_ID: (id: string) => `/loanContact/${id}`,
    CREATE: "/loanContact",
    UPDATE: (id: string) => `/loanContact/${id}`,
    UPDATE_ADMIN_APPROVED: (id: string) => `/loanContactUpdate/${id}`,
  },

  UPLOAD: {
    FILE: "/upload/single",
    FILE_MULTIPLE: "/upload/multi",
  },
  MAIN_STATUS: {
    GET_BY_ID: (usersInformationId: string) => `/status/${usersInformationId}`,
  },

  ADDRESS_DROPDOWN: {
    province: "/provinces",
    district: (provinceCode: string) =>
      `/districts?provinceCode=${provinceCode}`,
    subdistrict: (districtCode: string) =>
      `/subdistricts?districtCode=${districtCode}`,
  },
};
