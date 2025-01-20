import { connect } from "mongoose";

export async function connectToDB() {
    try {

        let connection = await connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/store")
        console.log("mongo db connected. ")
    }
    catch (err) {
        console.log("cannot connect MongoDb" + err.message)
        process.exit(1)
    }
}
