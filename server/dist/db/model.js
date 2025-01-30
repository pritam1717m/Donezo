"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const todoSchema = new mongoose_2.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: Number },
    tags: { type: [String] },
    deadline: { type: Date },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
const userSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todo: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Todo" }],
}, { timestamps: true });
exports.User = (0, mongoose_2.model)("User", userSchema);
exports.Todo = (0, mongoose_2.model)("Todo", todoSchema);
