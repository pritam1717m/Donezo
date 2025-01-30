import mongoose from "mongoose";
import { Schema, model } from "mongoose";

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

const todoSchema = new Schema<Todo>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number },
    tags: { type: [String] },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new Schema<UserDetails>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

export const User = model<UserDetails>("User", userSchema);
export const Todo = model<Todo>("Todo", todoSchema);
