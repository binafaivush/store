import { Schema, model } from "mongoose";
// לעשות סכמה מסוג minimalProduct  ???
 
const orderSchema = Schema({

    date:{type:Date, default:new Date()},
    deadline: Date,
    adress: String,
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, 
    
    productList :[{
        _id: String,
        name: String,
        price: Number,
        amount:{type: Number, default: 1}
    }],

    isOnWay :{type: Boolean, default:false} ,
    shippingPrice: Number,
    finalPrice: Number,
        
})


export const orderModel = model ("order", orderSchema);