import { create } from "zustand";
import { serverApi } from "../services/api";
import type {
  UploadFileResult,
  UploadFilesMap,
  UploadFileState,
} from "../types/upload.type";
import { API } from "../constants/apiPath";

export const useUploadFileStore = create<UploadFileState>((set) => ({
  files: {},
  multiFiles: [],
  uploading: false,
  uploadProgress: 0,
  uploadError: null,

  // 🔹 Single upload
  uploadFile: async (file, subName) => {
    set({ uploading: true, uploadProgress: 0, uploadError: null });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subName", subName);

      const res = await serverApi.post(API.UPLOAD.FILE, formData, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / (e.total || 1));
          set({ uploadProgress: progress });
        },
      });

      const fileData: UploadFileResult = res.data.data;

      set((state) => ({
        files: {
          ...state.files,
          [subName]: fileData,
        },
      }));

      return fileData;
    } catch (err) {
      set({ uploadError: "Upload failed" });
      throw err;
    } finally {
      set({ uploading: false });
    }
  },

  // 🔹 Multiple upload
  uploadMultiple: async (files) => {
    set({ uploading: true, uploadError: null });

    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));

      const res = await serverApi.post(API.UPLOAD.FILE_MULTIPLE, formData);

      const results: UploadFileResult[] = res.data.data;

      set({ multiFiles: results });

      return results;
    } catch (err) {
      set({ uploadError: "Multi upload failed" });
      throw err;
    } finally {
      set({ uploading: false });
    }
  },
}));
