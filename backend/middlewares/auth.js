import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";


export const isAuthenticated = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies
    
    if(!token){
        return next(new ErrorHandler("User is not Authenticated",401))
    }
    const decoded = jwt.verify(token,process.env.JWT_PUBLIC_KEY,{algorithm :'RS256' })

    req.user = await User.findById(decoded.id) //decoded contains payload we sent when we sign to jwt

    next()
})
