import { Router } from "express";

import { addOrder, deleteOrderById, getAllOrders, updateOrderOnWay, getAllOrdersByUserId} from "../controllers/order.js"

const router = Router();

//כל הפונקציות עובדות מצויין ברוך השם

router.get("/", getAllOrders);
router.get("/:id", getAllOrdersByUserId);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateOrderOnWay);
router.post("/", addOrder) 

export default router;