"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSchema = void 0;
const zod_1 = require("zod");
exports.menuSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    description: zod_1.z.string().nonempty({ message: "description is required" }),
    price: zod_1.z.number().min(0, { message: "Price can not be negative" }),
    image: zod_1.z.instanceof(File).optional().refine((file) => (file === null || file === void 0 ? void 0 : file.size) !== 0, { message: "Image file is required" }),
});
