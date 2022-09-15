import express, { Request, Response } from "express";

import { File } from "../models/file";

export const router = express.Router();

const title = "Rijndael";

router.get("/", async (req: Request, res: Response) => {
  res.redirect("/poli");
});

// POLI
router.get("/poli", async (req: Request, res: Response) => {
  res.redirect("/poli/anak");
});

router.get("/poli/anak", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "anak" });

  res.render("poli/anak", {
    layout: "poli/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});

router.get("/poli/dalam", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "dalam" });

  res.render("poli/dalam", {
    layout: "poli/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});

router.get("/poli/jantung", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "jantung" });

  res.render("poli/jantung", {
    layout: "poli/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});

// DOKTER
router.get("/dokter", async (req: Request, res: Response) => {
  res.redirect("/dokter/anak");
});

router.get("/dokter/anak", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "anak" });

  res.render("dokter/anak", {
    layout: "dokter/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});

router.get("/dokter/dalam", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "dalam" });

  res.render("dokter/dalam", {
    layout: "dokter/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});

router.get("/dokter/jantung", async (req: Request, res: Response) => {
  const rm = await File.find({ poli: "jantung" });

  res.render("dokter/jantung", {
    layout: "dokter/layout/index",
    title,
    rm,
    error: req.flash("error"),
  });
});
