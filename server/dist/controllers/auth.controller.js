"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../db/model");
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter valid email" }),
    password: zod_1.z.string().min(6, { message: "Enter atleast 6 character" }),
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Can't Parse",
        });
        return;
    }
    const signInBody = req.body;
    try {
        const user = yield model_1.User.findOne({
            email: signInBody.email,
        });
        if (!user) {
            res.status(404).json({
                message: "No user found",
            });
            return;
        }
        const decodedPassword = yield bcrypt_1.default.compare(signInBody.password, user.password);
        if (!decodedPassword) {
            res.status(401).json({
                message: "Wrong Password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign(String(user._id), process.env.JWT_SECRET);
        if (!token) {
            res.status(402).json({
                message: "Error while genarating token",
            });
            return;
        }
        res.status(200).json({
            user,
            token,
            message: "Signed in Successfully",
        });
    }
    catch (err) {
        res.status(403).json({
            message: "Something went wrong",
        });
    }
});
exports.signin = signin;
const signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Enter your name"),
    email: zod_1.z.string().email({ message: "Enter valid email" }),
    password: zod_1.z.string().min(6, { message: "Enter atleast 6 character" }),
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: "Can't parse",
        });
        return;
    }
    const signUpBody = req.body;
    try {
        const existingUser = yield model_1.User.findOne({
            email: signUpBody.email,
        });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(signUpBody.password, 10);
        try {
            const newUser = yield model_1.User.create({
                name: signUpBody.name,
                email: signUpBody.email,
                password: hashedPassword,
            });
            const demoTodo = yield model_1.Todo.create({
                user_id: newUser._id,
                title: "Welcome to Donezo! 🎉",
                description: "Get started by adding your first task. Stay organized and boost your productivity with Donezo!",
                priority: 1,
                tags: ["Welcome", "Getting Started"],
                deadline: null,
                completed: false,
            });
            yield model_1.User.findByIdAndUpdate(newUser._id, {
                $push: { todo: demoTodo._id },
            });
            const token = jsonwebtoken_1.default.sign(String(newUser._id), process.env.JWT_SECRET);
            if (!token) {
                res.status(402).json({
                    message: "Error while genarating token",
                });
                return;
            }
            res.status(200).json({
                newUser,
                token,
                message: "Signed un Successfully",
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        res.status(403).json({
            message: "Something went w",
        });
    }
});
exports.signup = signup;
