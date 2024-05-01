import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESTAURENT",
    }).then(()=>{
        console.log('Database connection successful');
    }).catch((err)=>{
        console.log('Database connection failed',err);
    });
}