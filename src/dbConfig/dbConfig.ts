import mongoose from "mongoose";

export async function connectDB()  {

    try {
        const uri = process.env.MONGO_URI;
        
        // Check if MONGODB_URI is defined
        if(!uri){
            throw new Error("MONGODB_URI is not defined");
        }
        
        // Avoid reconnecting if already connected
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        // Connect to MongoDB 
        const db = mongoose.connection
        db.on("connected", () => {
            console.log("Connected to MongoDB"); //remove this after deployment
        });

        db.on("error", (error: Error) => {
            console.error("Connection Filed to MongoDB",error);
        });

        await mongoose.connect(uri);
        console.log("Connection started to MongoDB"); //remove this after deployment
   
    } catch (error) {
        console.error("Error in connection to MongoDB",error);
    }
};