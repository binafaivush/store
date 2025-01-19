import { Router } from "express";

import { addProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from "../controllers/product.js"


const router = Router();

//כל הפונקציות הבאות עובדות פצצה ניסיתי אותן

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", updateProductById);
router.post("/", addProduct);

export default router;