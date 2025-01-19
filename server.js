import express from "express";
import dotenv from "dotenv";

import orderRouter from "./routers/order.js";
import productRouter from "./routers/product.js";
import userRouter from "./routers/user.js";
import  {connectToDB}  from "./config/db.js";
// import { logToFile } from "./middlewares/logToFile.js";

const app = express();
connectToDB();
dotenv.config();//מה זה?

// app.use(logToFile);
app.use(express.json());

app.get("/all", () =>{//למחוק
    console.log("hello to you");
    
})

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

const port = process.env.PORT;
app.listen(port, "localhost", () => {
  console.log("app is running on port " + port);
});
