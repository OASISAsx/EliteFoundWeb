export interface User {
  id: string;
  email: string;
  name: string;
  usersInformationId: string | null;
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
