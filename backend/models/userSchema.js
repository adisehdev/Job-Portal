import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            minLength: [3, "Name must contain at least 3 characters"],
            maxLength: [30, "Name must not exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            validate: [validator.isEmail, "Enter a valid email"]
        },
        phone: {
            type: Number,
            required: [true, "Please enter your phone number"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [8, "Password must be at least 8 characters long"],
            maxLength: [24, "Password length cannot exceed 24 characters"],
            select: false
        },
        role: {
            type: String,
            required: [true, "Please enter a role"],
            enum: ["Job Seeker", "Employer"]
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        methods: {
            comparePassword : async function (pw)  {
                return await bcrypt.compare(pw, this.password);
            },
            createToken : function () {
                return jwt.sign({ id: this._id }, process.env.JWT_PRIVATE_KEY, { algorithm: 'RS256' });
            }
        }
    }
);

// ENCRYPTING THE PASSWORD USING BCRYPT BEFORE SAVING
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { 
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model('User', userSchema);
