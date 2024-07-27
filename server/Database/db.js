import mongoose from "mongoose";
const DB_URL = `mongodb://localhost:27017/File_Sharing_Link?directConnection=true`;
const DBConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connection established");
  } catch (error) {
    console.error("Error While Connecting with Database", error.message);
  }
};

export default DBConnection;
