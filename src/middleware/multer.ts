import { Request } from "express";
import { mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const multerOption = {
  fileFilter: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return callback(null, false);
    }
    callback(null, true);
  },
};

export const upload = multer(multerOption);
