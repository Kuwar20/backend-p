import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";


export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill in all fields", 400));
    }

    try{
        await Reservation.create({
            firstName,
            lastName,
            email,
            phone,
            date,
            time,
        });
        res.status(201).json({"message": "Reservation sent successfully!"});
    }catch(error){
        if(error.name === "ValidationError"){
            return next(new ErrorHandler(Object.values(error.errors).map((value) => value.message).join(", "), 400));
        }
        return next(new ErrorHandler(error.message, 400));
    }
};