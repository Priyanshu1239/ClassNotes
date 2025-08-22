import mongoose from 'mongoose';
import dotenv from "dotenv";  



const contactSchema=new mongoose.Schema({
    name:
    {
        required:true,
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});


export const Contact = mongoose.model('Contact',contactSchema);