"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  value?: File | null;
  previewUrl?: string | null;
  onChange: (file: File | null) => void;
}
export default function UploadIDCard({ value, previewUrl, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = value ? URL.createObjectURL(value) : previewUrl || null;

  return (
    <Box
      sx={{
        border: "2px dashed #aaa",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        justifyContent: "center",
        cursor: "pointer",
        display: "flex",
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onChange(e.target.files[0]);
          }
        }}
      />

      {preview ? (
        <Image
          src={preview}
          alt="ID Card Preview"
          width={300}
          height={180}
          style={{
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ) : (
        <Typography color="text.secondary">
          คลิกเพื่ออัปโหลดรูปบัตรประชาชน
        </Typography>
      )}
    </Box>
  );
}
