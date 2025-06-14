import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sellerRegistrationRoutes from "./routes/SellerRegistration.routes.";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import db from "./config/db";
import route from './routes/route';


db();

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/register", sellerRegistrationRoutes);
app.use('/api', route);

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "This is a test" });
});

app.use(errorHandler); // errror handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
