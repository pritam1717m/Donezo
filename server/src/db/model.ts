import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    username : String,
    password : String,
    todos : {type: mongoose.Schema.ObjectId, ref : "Todo"},
}, {timestamps: true})

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean,
}, {timestamps : true})

export const User = mongoose.model('User', userSchema);
export const Todo = mongoose.model('Todo', todoSchema);