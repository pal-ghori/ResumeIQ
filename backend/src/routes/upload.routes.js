import express from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadResume } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/", upload.single("resume"), uploadResume);

export default router;