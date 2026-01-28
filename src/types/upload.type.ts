export interface UploadFileResult {
  id: string;
  url: string;
}

export interface UploadFilesMap {
  card?: UploadFileResult;
  statement?: UploadFileResult;
  certificate?: UploadFileResult;
}

export interface UploadFileState {
  files: UploadFilesMap;
  multiFiles: UploadFileResult[];

  uploading: boolean;
  uploadProgress: number;
  uploadError: string | null;

  uploadFile: (
    file: File,
    subName: keyof UploadFilesMap,
  ) => Promise<UploadFileResult>;

  uploadMultiple: (files: File[]) => Promise<UploadFileResult[]>;
}
