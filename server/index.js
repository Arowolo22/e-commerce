import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import { connectDB } from "./model/db.js";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// MongoDB connection
connectDB();
const PORT = process.env.PORT || 5000;

app.use("/api", productRoutes);
app.use("/", (req, res) => {
   res.send("Welcome to the Product API");
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

