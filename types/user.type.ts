import { UsersInformation } from "./userInfomation.type";

export interface User {
  id: string;
  name: string;
  email: string;
  usersInformationId: string | null;
  usersInformation: UsersInformation | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface UserListStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
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
