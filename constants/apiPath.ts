export const API = {
  AUTH: {
    LOGIN: "/login",
    LOGIN_GOOGLE: "/loginGoogle",
    REGISTER: "/register",
  },

  USER: {
    GET_ALL: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
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
};
