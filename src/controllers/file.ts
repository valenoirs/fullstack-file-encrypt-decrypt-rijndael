import { Request, Response } from "express";

import { File } from "../models/file";

import { encrypt, decrypt } from "../helper/rijndael";
import path from "path";
import { appendFileSync } from "fs-extra";
import { unlinkSync } from "fs";

/**
 * File Upload controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const uploadFile = async (req: Request, res: Response) => {
  const { poli } = req.body;
  try {
    console.log(req.file);

    const encrypted = encrypt(req.file?.buffer);

    req.body.buffer = encrypted;

    await new File(req.body).save();

    // Success response
    console.log(`[server]: OK! file-uploaded!`);

    req.flash("error", "Data Rekam Medis Berhasil Ditambahkan.");
    return res.redirect(`/poli/${poli}`);
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("upload-error", error);
    req.flash("error", "Upload rekam medis gagal, mohon coba lagi.");
    return res.redirect(`/poli/${poli}`);
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const file = await File.findById(id);

    const fileName = `${file?.createdAt?.toLocaleDateString("ko-KR")}_${
      file?.pasien
    }_${file?.poli}_${file?.dokter}.pdf`;

    const decrypted = decrypt(file?.buffer);

    const dir = path.join(__dirname, "../public/temp");

    appendFileSync(`${dir}/${fileName}`, decrypted, "binary");

    res.redirect(`http://localhost:5000/temp/${fileName}`);
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("upload-error", error);
    req.flash("error", "Download rekam medis gagal, mohon coba lagi.");
    return res.redirect(`/`);
  }
};
