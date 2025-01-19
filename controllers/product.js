import { isValidObjectId } from "mongoose";

// import{orderModel} from "../models/order.js"
// import { userModel } from "../models/user.js";
import { productModel } from "../models/product.js";

//good
export const getAllProducts = async (req, res, next) => {
  try {
    let result = await productModel.find()
    // .populate("product"/*הולך לשדה הזה ומחפש איבר מתאים מהאוסף המתאים כפי שכתוב במודל*/);
    res.json(result);
  } catch (err) {
    res
      .status(400)
      .json({ title: "cannot get all products", message: err.message });
  }
};

//good
export const getProductById = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({
      title: "object id is not valid",
      message: "not in correct ObjectId format",
    });
  console.log("------" + id);
  try {
    let result = await productModel.findById(id);
    if (!result)
      return res
        .status(400)
        .json({ title: "cannot get product by id", message: "no such product" });
    res.json(result);
  } catch (err) {
    res
      .status(400)
      .json({ title: "cannot get al products", message: err.message });
  }
};

// export const getAllProductsByUserId = async (req, res, next) => {
//   let { userid } = req.params;
//   if (!isValidObjectId(userid))
//     return res
//       .status(400)
//       .json({
//         title: "object id is not valid",
//         message: "not in correct ObjectId format",
//       });

//   try {
//     let result = await orderModel.find({ "user._id": userid });//רוצה להוציא הכל ולא רק את הראשון שמצא
//     let array = result.map(item => item.products)
//     res.json(array);
//       }
//        catch (err) {
//     res.status(400).json({ title: "cannot get all products of this user", message: err.message });
//   }
// };


//good
export const addProduct = async (req, res, next) => {
  let { body } = req;
  if (!body.name || !body.price || !body.price > 0)
    return res.status(404).json({ title: "missing details ", message: "name or price arr missing" })

  if (body.productionDate && body.productionDate > new Date())
    return res.status(404).json({ title: "wrong date ", message: "date is later than today " })

  try {

    let newProduct = new productModel(body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ title: "cannot save product", message: err.message });
  }
};

//good
export const deleteProductById = async (req, res, next) => {
  let { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({
      title: "object id is not valid",
      message: "not in correct ObjectId format",
    });
  console.log("------" + id);

  productModel.findByIdAndDelete(id)
    .then(data => {
      if (!data)
        return res.status(404).json({ title: "cannot delete by id", message: "no product with such id " + id })
      res.json(data)
    })
    .catch(error => {
      res.status(400).json({ title: "cannot delete by id ", massage: error.message })
    })

}

//good
export const updateProductById = async (req, res, next) => {
  let { id } = req.params;
  let { body } = req;

  //לפי השאלה  שלי בסוף הפונקציה לעשות בדיקות תקינות למה שצריך לעשות

  if (!isValidObjectId(id))
    return res.status(400).json({
      title: "object id is not valid",
      message: "not in correct ObjectId format",
    });
  console.log("------" + id);

  await productModel.findByIdAndUpdate(id, body, { new: true })// לשאול האם השורה הזו מעדכנת רק את השורות שנשלחו עדכונים ומשאירה את הישנים שלא נשלחו עדכונים כפי שהם היו
    .then(data => {
      if (!data)
        return res.status(404).json({ title: "cannot update product by id", message: "no product with such id: " + id })
      res.json(data)
    })
    .catch(error => {
      res.status(400).json({ title: "cannot update product by id", message: error.message })
    })
}
