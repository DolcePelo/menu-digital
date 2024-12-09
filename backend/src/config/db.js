import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb:localhost:27017/menudigital";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
}

export { DB_URL, connectDB };