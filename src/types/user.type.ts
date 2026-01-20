import { JobDetail } from "./jobDetail.type";
import {
  CreateUserInformationInput,
  UserInformation,
} from "./userInfomation.type";

export interface User {
  id: string;
  name: string;
  email: string;
  usersInformationId: string | null;
  usersInformation: UserInformation | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface UserListStore {
  users: any[];
  user: User | null;
  loading: boolean;
  page: number;
  limit: number;
  userDeail: UserInformation | null;
  fetchUsers: () => Promise<void>;
  fetchUser: (id: string, token: string) => Promise<void>;
  fetchUserDetail: (
    id: string,
    token: string,
  ) => Promise<UserInformation | null>;
  setUser: (u: any) => void;
  logout: () => void;
  setPage: (p: number) => void;
}

export interface LoginStore {
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterStore {
  user: User | null;
  loading: boolean;
  register: (payload: RegisterPayload) => Promise<void>;
}

interface UserStore {
  user: User | null;
  setUser: (u: User) => void;
  logout: () => void;
}
