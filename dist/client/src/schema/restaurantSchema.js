"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantFromSchema = void 0;
const zod_1 = require("zod");
exports.restaurantFromSchema = zod_1.z.object({
    restaurantName: zod_1.z.string().nonempty({ message: "Restaurant name is required" }),
    city: zod_1.z.string().nonempty({ message: "City is required" }),
    country: zod_1.z.string().nonempty({ message: "Country is required" }),
    deliveryTime: zod_1.z.number().min(0, { message: "Delivery time can not be negative" }),
    cuisines: zod_1.z.array(zod_1.z.string()),
    imageFile: zod_1.z.instanceof(File).optional().refine((file) => (file === null || file === void 0 ? void 0 : file.size) !== 0, { message: "Image file is required" }),
});
