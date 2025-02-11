"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = (url) => {
    try {
        mongoose_1.default.connect(url).then(() => {
            console.log("mongodb is connected successfully...");
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = dbConnect;
