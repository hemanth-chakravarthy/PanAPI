import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sellerRegistrationRoutes from "./routes/SellerRegistration.routes.";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";


dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/register", sellerRegistrationRoutes);

app.use(errorHandler); // errror handler

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
