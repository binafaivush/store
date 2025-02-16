import { Router } from "express";

import { signUp, getAllUsers, getUserById, updateUserDetails, updateUserPassword, login } from "../controllers/user.js"


const router = Router();

//הכל עובד מצוין בדקתי את כולן

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserDetails);
router.put("/", updateUserPassword);
router.post("/", signUp);
router.post("/login", login)

export default router;