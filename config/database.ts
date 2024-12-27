import mongoose from "mongoose";

export const connectDatabase=async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("connect to db success")
    }catch(error)
    {
        console.log("faild when connect to db")
    }
}