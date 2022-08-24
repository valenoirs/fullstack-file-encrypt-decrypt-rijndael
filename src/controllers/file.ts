import { Request, Response } from "express";

import { File } from "../models/file";

import { encrypt, decrypt } from "../helper/rijndael";
import path from "path";
import { unlinkSync, writeFileSync } from "fs";

/**
 * File Upload controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const uploadFile = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    const { dokter, pasien, poli, role } = req.body;

    // let base: string = "/dokter/";

    const encrypted = encrypt(req.file?.buffer);

    req.body.buffer = encrypted;

    await new File(req.body).save();

    // if (role === "poli") {
    //   base = "/poli/";
    // }

    // Success response
    console.log(`[server]: OK! file-uploaded!`);

    return res.redirect(`/poli/${poli}`);
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("upload-error", error);
    return res.status(500).json({
      message: "File Upload Error",
    });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const file = await File.findById(id);

    const decrypted = decrypt(file?.buffer);

    const dir = path.join(__dirname, "../public/temp");

    writeFileSync(`${dir}/temp.pdf`, decrypted, "binary");

    res.redirect("http://localhost:5000/temp/temp.pdf");
  } catch (error) {
    // Error handler if something went wrong while signing in user
    console.error("download-error", error);
    return res.status(500).json({
      message: "File Download Error",
    });
  }
};
