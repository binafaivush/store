import { isValidObjectId } from "mongoose";

import { userModel } from "../models/user.js";
import { orderModel } from "../models/order.js";
import { productModel } from "../models/product.js";


//good
export const getAllOrders = async (req, res, next) => {
    try {
      let result = await orderModel.find()
      // .populate("order"/*הולך לשדה הזה ומחפש איבר מתאים מהאוסף המתאים כפי שכתוב במודל*/);
      res.json(result);
    } catch (err) {
      res
        .status(400)
        .json({ title: "cannot get all orders", message: err.message });
    }
  };


//good
export const addOrder = async (req, res, next) => {
    let { body } = req;
    if ( ! body.userId || ! body.adress || !body.productList || body.productList.length == 0)
      return res.status(404).json({ 
        title: "missing body data",
        message: "adress, userId ,productList are required",
      });
      for (let j = 0; j < body.productList.length; j++) {
        if(! body.productList[j].price || !body.productList[j]._id) 
          return res.status(404).json({ 
            title: "missing body data",
            message: "_id and price in productList are required",
          });
          if( !body.productList[j].amount )
            body.productList[j].amount = 1;
      }
    try {
      let user = await userModel.findById(body.userId);
      if (!user)
        return res.status(404).json({ title: "no such user", message: "userId not found" });
     
      let productids = body.productList.map(item => item._id);
      let arrFullProducts = await productModel.find({ _id: { $in: productids } });
      console.log(productids, arrFullProducts)///בדיקה בשבילי
      if (arrFullProducts.length != productids.length)
        return res.status(404)
      .json({ title: "one or more products are invalid", message: "check if products are in store" });// היה רק כמה id ומצא לפיהם את המוצרים אם יש שלש id ורק שתי מוצרים מסיבה מסויימת ,למה שלא ימשיך קניה של שתי מוצרים ????? לסדר חשוב
//עלול להווצר כאן בעיה שאם מישהו הכניס מחיר לא נכון על מוצר . לדעתי צריך לקחת את המחיר מהמערך של המוצרים המלאים .השאלה היא אם הם שווים בסדרם
      let cost = 0;
      for (let i = 0; i < body.productList.length; i++)       
             cost += body.productList[i].price * body.productList[i].amount;
        //לשים לב : לא שמרתי את המערך המלא בתוך ההזמנה רק השתמשתי איתו לעזרתי אם אני מחליטה לשמור על המוצרים המלאים בתוך כל הזמנה אני צריכה לשנות 
        if(cost >= 200)
          body.shippingPrice = 0 ;
        else if(cost >= 100)
          body.shippingPrice = 15; 
        else
          body.shippingPrice = 30;

       body.finalPrice = cost + body.shippingPrice;

      let newOrder = new orderModel(body);
            await newOrder.save(); 
      res.json(newOrder);
    } catch (err) {
      res.status(400).json({ title: "cannot save order", message: err.message });
    }
  };




export const deleteOrderById = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id)) {
      return res.status(400).json({
          title: "object id is not valid",
          message: "not in correct ObjectId format",
      });
  }
  console.log("------" + id);

  try {
      const order = await orderModel.findById(id);
      if (!order) {
          return res.status(404).json({ title: "cannot delete by id", message: "no order with such id " + id });
      }

      if (order.isOnWay) {
          return res.status(404).json({ title: "cannot delete by id", message: "the order is on way, you are not allowed to delete" });
      }

      const deletedOrder = await orderModel.findByIdAndDelete(id);
      if (!deletedOrder) {
          return res.status(404).json({ title: "cannot delete by id", message: "try to delete and not success. no order with such id: " + id });
      }

      res.json(deletedOrder);
  } catch (error) {
      res.status(400).json({ title: "cannot delete by id", message: error.message });
  }
}



  export const getAllOrdersByUserId = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id))
    return res
      .status(400)
      .json({
        title: "object id is not valid",
        message: "not in correct ObjectId format",
      });
  try {
    let result = await orderModel.find({ userId: id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ title: "cannot get all orders of this user", message: err.message });
  }
};


    //good
    export const updateOrderOnWay = async (req, res, next) => {
      let { id } = req.params;
      if (!isValidObjectId(id))
        return res.status(400).json({
          title: "object id is not valid",
          message: "not in correct ObjectId format",
        });
      console.log("------" + id);
  
     
         orderModel.findByIdAndUpdate(id, { isOnWay: true }, { new: true })
         .then(data => {
      if(!data)
          return res.status(404).json({ title: "cannot update order go on way", message: "no order with such id: " + id})
      res.json(data)
  })
  .catch(error => {
      res.status(400).json({title: "cannot update  order go on way", message:error.message})
  })
    } 