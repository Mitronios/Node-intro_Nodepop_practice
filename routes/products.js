import express from "express";
import * as productsController from "../controllers/productsController.js";

const router = express.Router();

//Get
router.get("/add", productsController.index);

//Post
router.post("/add", productsController.postNewProduct);

export default router;
