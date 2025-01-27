import { connect } from "mongoose";

export async function connectToDB() {
    try {
        console.log("DB_URL:", process.env.DB_URL);

        // חיבור ל-MongoDB
        const connection = await connect(process.env.DB_URL);

        console.log("MongoDB connected:", connection.connection.host);
    } catch (err) {
        console.error("Cannot connect to MongoDB:", err.message);
        process.exit(1); // סיים את התהליך במקרה של שגיאה
    }
}
