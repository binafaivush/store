import { Schema, model } from "mongoose";


const userSchema = Schema({
    userName:String,
    adress:String,
    email:String,
    phone:String,
    password:String,
    logInDate:{type:Date, default: new Date()}
    // role:
    // paymentMethode:string
})

export const userModel = model("user", userSchema);