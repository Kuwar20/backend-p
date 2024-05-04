import e from "express";
import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must be at least 2 characters long"],
        maxLength: [30, "Last name must be at most 30 characters long"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First name must be at least 2 characters long"],
        maxLength: [30, "Last name must be at most 30 characters long"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must be at least 10 characters long"],
        maxLength: [10, "Phone number must be at most 10 characters long"],
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);