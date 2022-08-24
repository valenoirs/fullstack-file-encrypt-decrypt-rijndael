import { Model } from "mongoose";

export interface IFile {
  buffer: Buffer;
  dokter: string;
  pasien: string;
  poli: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// File model type
export type FileModel = Model<IFile>;
