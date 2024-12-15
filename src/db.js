import mongoose from 'mongoose';

export const connectDB = async ()=>{
    const URL= process.env.MONGODB;
    try{
        await mongoose.connect(URL);
        console.log("Base de datos conectada");
    }catch(error){
        console.log(error);
    }
}