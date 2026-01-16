import { UserInformation } from "./userInfomation.type";

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
  users: User[];
  user: User | null;
  loading: boolean;
  page: number;
  limit: number;

  fetchUsers: () => Promise<void>;
  setUser: (u: User) => void;
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
