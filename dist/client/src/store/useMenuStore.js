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
exports.useMenuStore = void 0;
const axios_1 = __importDefault(require("axios"));
const sonner_1 = require("sonner");
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const useRestaurantStore_1 = require("./useRestaurantStore");
const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/menu";
axios_1.default.defaults.withCredentials = true;
exports.useMenuStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    loading: false,
    menu: null,
    createMenu: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update restaurant 
            useRestaurantStore_1.useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    editMenu: (menuId, formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            // update restaurant menu
            useRestaurantStore_1.useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
}), {
    name: "menu-name",
    storage: (0, middleware_1.createJSONStorage)(() => localStorage)
}));
