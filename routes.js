import dotenv from "dotenv";
import express from "express"
import { scanController } from "./controller.js";

const router = express.Router();

router.post("/scan", scanController);

export default router