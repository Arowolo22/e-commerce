import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("connected to database");
   } catch (error) {
      console.log(`database not connected ${error}`);
      process.exit(1);
   }
};


