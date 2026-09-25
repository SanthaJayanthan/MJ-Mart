import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/MJMart`, {
            serverSelectionTimeoutMS: 5000,
        })
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB;