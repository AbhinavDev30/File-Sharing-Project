import multer from "multer";
const storageImg = multer.diskStorage({
  destination: "uploadsImg/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadsImg = multer({
  storage: storageImg,
});

export default storageImg;
