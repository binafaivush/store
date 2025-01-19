import { isValidObjectId } from "mongoose";

import { orderModel } from "../models/order.js";
import { userModel } from "../models/user.js";
import { productModel  } from "../models/product.js";
  
  //good
export const signUp = async (req, res, next) => {//חסרה כאן בדיקה שאין משתמש עם פרטים זהים 
  let { body } = req;
  if(!body.userName || !body.email || ! body.password )
    return res.status(404).json( {title:"missing details ", message:"userName, email and password are required "})

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email format
  if (!emailRegex.test(body.email)) {
      return res.status(400).json({
          title: "invalid email",
          message: "invalid email, please enter correct email",
      });
  }
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/; // לפחות 7 תווים, כולל אותיות ומספרים
  if (!passwordRegex.test(body.password)) {
      return res.status(400).json({
          title: "valid password",
          message: "not a strong password, please enter a password with letters, numbers and between 7-15 characters",
      });
  }
//לתקן/******************************************************* */
 //body.role =//כאן צריך להוסיף USER/ADMIN ?????
  try {
    
     let newUser = new userModel(body); 
    await newUser.save(); 
      res.json(newUser);
  } catch (err) {
    res.status(400).json({ title: "cannot save user", message: err.message });
  }
};




  //good
  export const getUserById = async (req, res, next) => {
    let { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({
        title: "object id is not valid",
        message: "not in correct ObjectId format",
      });
    console.log("------" + id);
    try {
      let result = await userModel.findById(id);
      if (!result)
        return res
          .status(400)
          .json({ title: "cannot get user by id", message: "no such user" });
      res.json(result);
    } catch (err) {
      res
        .status(400)
        .json({ title: "cannot get  user by id", message: err.message });
    }
  };
  
//good
  export const getAllUsers = async (req, res, next) => {
    try {
      let result = await userModel.find()
      res.json(result);
    }
     catch (err) {
      res
        .status(400)
        .json({ title: "cannot get all users", message: err.message });
    }
  };

  //i think it's good

 export const updateUserDetails = async (req, res, next) => {  
  let {id} = req.params;
  let {body} = req;
  const { password, ...update } = body;
  console.log(update);

  if (!isValidObjectId(id))
    return res.status(400).json({
      title: "object id is not valid",
      message: "not in correct ObjectId format",
    });
  console.log("------" + id);

   userModel.findByIdAndUpdate(id, update, { new: true})// לשאול האם השורה הזו מעדכנת רק את השורות שנשלחו עדכונים ומשאירה את הישנים שלא נשלחו עדכונים כפי שהם היו
  .then(data => {
      if(!data)
          return res.status(404).json({ title: "cannot update user by id", message: "no user with such id: " + id})
      res.json(data)
  })
  .catch(error => {
      res.status(400).json({title: "cannot update user by id", message:error.message})
  })
 }

//good
export const updateUserPassword = async (req, res, next) => {
  let {id} = req.body;
  let { password } = req.body;
  console.log("ID received:", id);

  if (!isValidObjectId(id)) {
      return res.status(400).json({
          title: "object id is not valid",
          message: "not in correct ObjectId format",
      });
  }

  // בדיקת סיסמא חזקה
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{7,15}$/; // לפחות 7 תווים, כולל אותיות ומספרים
  if (!passwordRegex.test(password)) {
      return res.status(400).json({
          title: "valid password",
          message: "not a strong password, please enter a password with letters, numbers and between 7-15 characters",
      });
  }

  userModel.findByIdAndUpdate(id, { password: password }, { new: true })
      .then(data => {
          if (!data) {
              return res.status(404).json({ title: "cannot update password by id", message: "no user with such id: " + id });
          }
          res.json(data);
      })
      .catch(error => {
          res.status(400).json({ title: "cannot update user password by id", message: error.message });
      });
};
//////////////////////////////////////////////////////////////////////////////////////////

 export const login = async (req, res, next) => {
  
  let {body}=req;
  if(!body.password||!body.userName)
      return res.status(404).json({title:"missing ",message:"userName and passworrd are required"})
  try{
   let result=await userModel.findOne({userName:body.userName, password:body.password});
  if(!result)
        return res.status(404).json({title:"no such details ",message:"login failed"})
   res.json(result);
  }
  catch(err){
      res.status(400).json({ title: "cannot users", message: err.message })
  }

 }