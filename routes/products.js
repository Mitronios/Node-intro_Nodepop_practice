import express from "express";
import * as productsController from "../controllers/productsController.js";
import { guard } from "../lib/sessionManager.js";

const router = express.Router();

//Get
router.get("/add", guard, productsController.index);

//Post
router.post("/add", guard, productsController.postNewProduct);

export default router;
