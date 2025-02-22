"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://viperholic:akash12345@cluster0.m0eniok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/rhezo");
        console.log("mongoDB connected.");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDB;
