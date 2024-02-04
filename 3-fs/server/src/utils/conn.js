import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
            dbName: "form_test",
        }).then((c) => console.log(`Connected to DB to ${c.connection.host}`))
        .catch((e) => console.log(e));
};