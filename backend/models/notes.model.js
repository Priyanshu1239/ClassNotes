import mongoose from 'mongoose';
import dotenv from "dotenv";  



const notesSchema=new mongoose.Schema({
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
    university:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    }
},{timestamps:true});


export const Notes = mongoose.model('Notes',notesSchema);