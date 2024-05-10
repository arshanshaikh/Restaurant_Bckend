import { json } from "express";
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";  

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, time, date } = req.body;

    // Check if any detail is missing
    if (!firstName || !lastName || !email || !phone || !time || !date) {
        return next(new ErrorHandler("Please fill out the entire reservation form!", 400));
    }

    // Create a new reservation object
    const newReservation = new Reservation({
        firstName,
        lastName,
        email,
        phone,
        time,
        date
    });

    try {
        // Save the reservation to the database
        await newReservation.save();

        res.status(200).json({
            success: true,
            message: "Reservation sent Successfully!"
        });

    } catch (error) {
        // Handle validation errors
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        // For other errors, pass it to the error handler middleware
        return next(error);
    }
};




// the code has converted into object 

// import { json } from "express";
// import ErrorHandler from "../error/error.js";
// import { Reservation } from "../models/reservationSchema.js";  

// export const sendReservation = async(req,res,next) =>{
//     const {firstName,lastName,email,phone,time,date} = req.body;
//     //if any details is not fill by the user then
//     if(!firstName || !lastName || !email || !phone || !time || !date){
//         return next(new ErrorHandler("Please fill full reservation form!",400)); //400 bad request
//     }

//     //if every detail is fill by the user then-->
//     try{
//         await Reservation.create(firstName,lastName,email,phone,time,date);
//         res.status(200).json({
//             success:true,
//             message:"Reservation sent Successfully!",
//         });

//         //after filling also error occur then--->

//     }catch(error){
//         if(error.name === "validationError"){
//             const validationErrors = Object.values(error.errors).map(
//             (err) => err.message
//             );
//             return next(new ErrorHandler(validationErrors.join(" , "),400));
//         }
//         return next(error);
//     }
//  };