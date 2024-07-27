import express from "express";
import cors from "cors";
import DBConnection from "./Database/db.js";
import multer from "multer";
import { uploadImgControl } from "./controller/imgController.js";
import { downloadImage } from "./controller/imgController.js";
const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//Multer
const upload = multer({ dest: "uploads" });
app.post("/upload", upload.single("file"), uploadImgControl);
app.get("/file/:fileId", downloadImage);

const PORT = 7000;

DBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
