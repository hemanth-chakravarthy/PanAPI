import express from "express";
import upload from "../middlewares/upload";
import { setCompanyDetails } from "../controllers/SellerRegistration.controller";
import { authenticate } from "../middlewares/Auth.middleware";

const router = express.Router();

router.post(
  "/company-details",authenticate,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  setCompanyDetails
)

export default router;
