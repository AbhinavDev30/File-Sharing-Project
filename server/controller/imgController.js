import { response } from "express";
import File from "../model/file.js";
export const uploadImgControl = async (req, res) => {
  try {
    const fileObj = {
      path: req.file.path,
      name: req.file.originalname, // Correct the typo here
    };

    const file = await File.create(fileObj);
    console.log(file);
    // Send success response to client
    res.status(201).json({
      message: "File uploaded successfully",
      file: `http://localhost:7000/file/${file._id}`,
    });
  } catch (error) {
    console.error(error.message);
    // Send error response to client
    res.status(500).json({ error: error.message });
  }
};

// export const downloadImage = async (req, res) => {
//   try {
//     const file = await File.findById(req.param.fileId);
//     file.downloadContent++;
//     await File.Save();
//     res.download(file.path, file.name);
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ error: error.message });
//   }
// };

export const downloadImage = async (req, res) => {
  try {
    const fileId = req.params.fileId; // Get the file ID from the URL
    const file = await File.findById(fileId);

    // Check if the file exists
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Increment the download count
    file.downloadCount++;
    await file.save();

    // Send the file as a download
    res.download(file.path, file.name, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to download the file" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
