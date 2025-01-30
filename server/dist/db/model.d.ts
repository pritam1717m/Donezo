import mongoose from "mongoose";
interface Todo {
    user_id: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string;
    priority: number;
    tags: string[];
    deadline: Date;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserDetails {
    name: string;
    email: string;
    password: string;
    todo: mongoose.Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const User: mongoose.Model<UserDetails, {}, {}, {}, mongoose.Document<unknown, {}, UserDetails> & UserDetails & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export declare const Todo: mongoose.Model<Todo, {}, {}, {}, mongoose.Document<unknown, {}, Todo> & Todo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export {};
