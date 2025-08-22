import mongoose from 'mongoose';
import dotenv from "dotenv";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema=new mongoose.Schema({
    username:
    {
        required:true,
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },

},{timestamps:true});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // ✅ This prevents double hashing

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Compare entered password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    const match = await bcrypt.compare(enteredPassword, this.password);
    console.log("Entered Password:", enteredPassword);
    console.log("Stored Hashed Password:", this.password);
    console.log("Password Match:", match);
    return match;
};


// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    const tokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    if (!tokenSecret) {
        throw new Error("JWT secret not configured");
    }
    return jwt.sign({ _id: this._id }, tokenSecret, { expiresIn: "15m" });
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
    if (!refreshSecret) {
        throw new Error("Refresh token secret not configured");
    }
    return jwt.sign({ _id: this._id }, refreshSecret, { expiresIn: "7d" });
};

export const User= mongoose.model('User', userSchema); 
