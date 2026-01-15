export interface UsersInformation {
  id?: string;

  full_name: string;
  last_name: string;
  tel: string;

  address: string;
  province: string;
  district: string;
  sub_district: string;
  zip_code: string;

  id_card: string;
  date_of_birth: string; // ISO string จาก API
  number_back_card: string;

  cardImage?: string;
  statementImage: string;

  work_place: string;
  position_work: string;
  salary: string;

  certificateImage?: string;
  age_work: string;
  userId: string;
  status?: string;
}

export interface UserInformationStore {
  userInformation: UsersInformation | null;
  loading: boolean;
  fetchUserInformation: (userId: string) => Promise<void>;
}

export interface UpdateInformationStore {
  userInformation: UsersInformation | null;
  loading: boolean;
  updateUserInformation: (
    userId: string,
    data: UsersInformation
  ) => Promise<void>;
}

export interface CreateInformationStore {
  userInformation: UsersInformation | null;
  loading: boolean;
  createInformation: (data: UsersInformation) => Promise<void>;
}
