import { Schema, model } from "mongoose";
import { IFile, FileModel } from "../interfaces/file";

// File Schema
const FileSchema: Schema = new Schema<IFile, FileModel>(
  {
    buffer: { type: Buffer, required: true },
    dokter: { type: String, required: true },
    pasien: { type: String, required: true },
    poli: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Hash file before store to database
// FileSchema.pre("save", function (next: any) {
//   if (this.isModified("buffer")) {
//     this.buffer = hashSync(this.buffer, 10);
//   }

//   next();
// });

// Export File model
export const File = model<IFile, FileModel>("File", FileSchema);
