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
exports.useOrderStore = void 0;
const axios_1 = __importDefault(require("axios"));
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/order";
axios_1.default.defaults.withCredentials = true;
exports.useOrderStore = (0, zustand_1.create)()((0, middleware_1.persist)((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: (checkoutSession) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSession, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.href = response.data.session.url;
            set({ loading: false });
        }
        catch (error) {
            set({ loading: false });
        }
    }),
    getOrderDetails: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.get(`${API_END_POINT}/`);
            set({ loading: false, orders: response.data.orders });
        }
        catch (error) {
            set({ loading: false });
        }
    })
})), {
    name: 'order-name',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage)
}));
