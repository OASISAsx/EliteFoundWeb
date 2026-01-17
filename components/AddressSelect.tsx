"use client";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useThaiGeoStore } from "@/stores/thaiGeo.store";
import { padding } from "@mui/system";

type AddressValue = {
  provinceCode?: number | null;
  districtCode?: number | null;
  subdistrictCode?: number | null;
};

type Props = {
  value?: AddressValue & { currentAddress?: string; zipcode?: string };
  onChange?: (
    val: AddressValue & { currentAddress?: string; zipcode?: string },
  ) => void;
};

export default function AddressSelect({ value, onChange }: Props) {
  const {
    provinces,
    districts,
    subdistricts,
    fetchProvinces,
    fetchDistricts,
    fetchSubdistricts,
    clearDistricts,
    clearSubdistricts,
  } = useThaiGeoStore();

  const [province, setProvince] = useState<number | "">("");
  const [district, setDistrict] = useState<number | "">("");
  const [subdistrict, setSubdistrict] = useState<number | "">("");
  const [currentAddress, setCurrentAddress] = useState<string>("");

  useEffect(() => {
    fetchProvinces();
  }, []);

  // preload province
  useEffect(() => {
    if (value?.provinceCode) {
      setProvince(value.provinceCode);
      fetchDistricts(String(value.provinceCode));
    }
  }, [value?.provinceCode]);

  // preload district
  useEffect(() => {
    if (value?.districtCode) {
      setDistrict(value.districtCode);
      fetchSubdistricts(String(value.districtCode));
    }
  }, [value?.districtCode]);

  useEffect(() => {
    if (value?.currentAddress) {
      setCurrentAddress(value.currentAddress);
    }
  }, [value?.currentAddress]);

  // preload subdistrict
  useEffect(() => {
    if (value?.subdistrictCode) {
      setSubdistrict(value.subdistrictCode);
    }
  }, [value?.subdistrictCode]);

  const handleProvinceChange = (e: SelectChangeEvent<number>) => {
    const code = Number(e.target.value);

    setProvince(code);
    setDistrict("");
    setSubdistrict("");
    clearDistricts();
    clearSubdistricts();
    fetchDistricts(String(code));

    onChange?.({
      provinceCode: code,
      districtCode: null,
      subdistrictCode: null,
    });
  };

  const handleDistrictChange = (e: SelectChangeEvent<number>) => {
    const code = Number(e.target.value);

    setDistrict(code);
    setSubdistrict("");
    clearSubdistricts();
    fetchSubdistricts(String(code));

    onChange?.({
      provinceCode: province as number,
      districtCode: code,
      subdistrictCode: null,
    });
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCurrentAddress(val);

    onChange?.({
      provinceCode: province as number,
      districtCode: district as number,
      subdistrictCode: subdistrict as number,
      currentAddress: val,
    });
  };
  const handleSubdistrictChange = (e: SelectChangeEvent<number>) => {
    const code = Number(e.target.value);
    setSubdistrict(code);

    const found = subdistricts.find((s) => s.code === code);

    onChange?.({
      provinceCode: province as number,
      districtCode: district as number,
      subdistrictCode: code,
      zipcode: found?.postalCode,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      pt={6}
      sx={{
        "& .MuiInputBase-input, & .MuiSelect-select": {
          fontWeight: 600,
          fontSize: 13,
        },
        "& .MuiInputLabel-root": {
          fontWeight: 600,
        },
      }}
    >
      <Grid item xs={12} sm={6} sx={{ pb: 1 }}>
        <FormControl fullWidth>
          <InputLabel>จังหวัด</InputLabel>
          <Select
            value={province}
            label="จังหวัด"
            onChange={handleProvinceChange}
          >
            {provinces.map((p) => (
              <MenuItem key={p.code} value={p.code}>
                {p.nameTh}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ pb: 1 }}>
        <FormControl fullWidth disabled={!province}>
          <InputLabel>อำเภอ</InputLabel>
          <Select
            value={district}
            label="อำเภอ"
            onChange={handleDistrictChange}
          >
            {districts.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.nameTh}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ pb: 4 }}>
        <FormControl fullWidth disabled={!district}>
          <InputLabel>ตำบล</InputLabel>
          <Select
            value={subdistrict}
            label="ตำบล"
            onChange={handleSubdistrictChange}
          >
            {subdistricts.map((s) => (
              <MenuItem key={s.code} value={s.code}>
                {s.nameTh}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ pb: 1 }}>
        {/* <textarea
          value={currentAddress}
          onChange={handleAddressChange}
          rows={4}
          placeholder="กรอกที่อยู่ปัจจุบัน"
          className="
    w-full rounded-xl border border-gray-300  font-bold
    px-4 py-3 text-sm text-gray-800
    placeholder-gray-400
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
    outline-none transition"
        /> */}
        <TextField
          label="ที่อยู่ปัจจุบัน"
          multiline
          rows={3}
          fullWidth
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
