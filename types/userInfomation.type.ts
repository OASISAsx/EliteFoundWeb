import { Dayjs } from "dayjs";
import { JobDetail } from "./jobDetail.type";

export interface UserInformation {
  id?: string;

  firstName: string;
  lastName: string;
  citizenId: string;
  dateOfBirth: Date;

  gender?: string | null;
  nationality?: string | null;
  maritalStatus?: string | null;

  phone: string;
  email?: string | null;
  lineId?: string | null;
  facebook?: string | null;

  currentAddress?: string;
  provinceCode?: number | null;
  districtCode?: number | null;
  subdistrictCode?: number | null;
  zipcode?: string | null;

  loanStatus?: string; // pending | approved | rejected

  id_card_image: string;
  other_files: string[];
  userId?: string;
  JobDetail?: JobDetail | null;
}
export interface CreateUserInformationInput {
  firstName: string;
  lastName: string;
  citizenId: string;
  dateOfBirth: Date;

  gender?: string | null;
  nationality?: string | null;
  maritalStatus?: string | null;

  phone: string;
  email?: string | null;
  lineId?: string | null;
  facebook?: string | null;

  currentAddress?: string;
  provinceCode?: number | null;
  districtCode?: number | null;
  subdistrictCode?: number | null;
  zipcode?: string | null;

  loanStatus?: string; // default = pending

  id_card_image: string;
  other_files: string[];
  userId?: string;
}
export interface UserInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;

  fetchUserInformation: (userId: string) => Promise<void>;
  createInformation: (data: UserInformation) => Promise<void>;
  updateInformation: (data: UserInformation, id: string) => Promise<void>;
}

export interface UpdateInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;
  updateUserInformation: (
    userId: string,
    data: UserInformation,
  ) => Promise<void>;
}

export interface CreateInformationStore {
  userInformation: UserInformation | null;
  loading: boolean;
  createInformation: (data: UserInformation) => Promise<void>;
}
