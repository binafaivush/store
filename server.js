import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import orderRouter from "./routers/order.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import { connectToDB } from "./config/db.js";
import { logToFile } from "./middlewares/logToFile.js";

dotenv.config();

const app = express();
connectToDB();


app.use(logToFile);
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("app is running on port " + port);
});


app.get("/all", () => {
  console.log("hello to you");

})
// leetCode
// https://leetcode.com/onboarding/?next=%2F


