import { create } from "zustand";
import { serverApi } from "../services/api";
import type { UploadFileState } from "../types/upload.type";
import { API } from "../constants/apiPath";

const useUploadFileStore = create<UploadFileState>((set) => ({
  files: {},
  uploading: false,
  uploadProgress: 0,
  uploadError: null,

  uploadFile: async (file, subName) => {
    set({ uploading: true, uploadProgress: 0, uploadError: null });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subName", subName);

      const res = await serverApi.post(API.UPLOAD.FILE, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          set({ uploadProgress: progress });
        },
      });

      console.log("UPLOAD RESPONSE:", res);
      console.log("UPLOAD DATA:", res.data);
      console.log("UPLOAD DATA.DATA:", res.data.data);

      set((state) => ({
        files: {
          ...state.files,
          [subName]: res.data,
        },
      }));
    } catch (err: any) {
      console.error("Upload error:", err);
      set({ uploadError: err.message || "Upload failed" });
    } finally {
      set({ uploading: false });
    }
  },
}));

export { useUploadFileStore };
