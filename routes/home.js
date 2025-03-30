import express from "express";
import * as homeController from "../controllers/homeController.js";

const router = express.Router();

//Get
router.get("/", homeController.index);

export default router;
