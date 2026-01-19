interface Province {
  code: number;
  nameTh: string;
  nameEn?: string;
}

interface District {
  code: number;
  nameTh: string;
  nameEn?: string;
  provinceCode: number;
}

interface Subdistrict {
  code: number;
  nameTh: string;
  nameEn?: string;
  postalCode: string;
  districtCode: number;
}

interface ThaiGeoStore {
  provinces: Province[];
  districts: District[];
  subdistricts: Subdistrict[];

  fetchProvinces: () => Promise<void>;
  fetchDistricts: (provinceCode: string) => Promise<void>;
  fetchSubdistricts: (districtCode: string) => Promise<void>;

  clearDistricts: () => void;
  clearSubdistricts: () => void;
}
