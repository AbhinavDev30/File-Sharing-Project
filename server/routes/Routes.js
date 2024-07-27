import express from "express";
import { uploadImg } from "../controller/imgController.js";

import multer from "multer";
//Multer
const storageImg = multer.diskStorage({
  destination: "uploadsImg/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadsImg = multer({
  storage: storageImg,
});

const router = express.Router();

router.post("/upload", uploadImg.single("file"), uploadImg);
export default router;
