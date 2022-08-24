import express from "express";
import { downloadFile, uploadFile } from "../controllers/file";
import { upload } from "../middleware/multer";

export const router = express.Router();

router.post("/download", downloadFile);

router.post("/upload", upload.single("file"), uploadFile);
