import mongoose from "mongoose";

export const dbConnection =() =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName : "RESTAURANT"
    }).then(()=>{
        console.log("Connected to database succesfully!!");
    }).catch((err)=>{
        console.error(`Error connecting to the database: ${err}`);
    });
}