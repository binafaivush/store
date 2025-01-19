import { Schema, model } from "mongoose";


const productSchema = Schema({
    name: String,
    description: String,
    productionDate: Date,
    imageRouting: String,
    price: Number,
    categories: [String]
})

export const productModel = model("product", productSchema);