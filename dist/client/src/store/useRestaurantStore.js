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
exports.useRestaurantStore = void 0;
const axios_1 = __importDefault(require("axios"));
const sonner_1 = require("sonner");
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/restaurant";
axios_1.default.defaults.withCredentials = true;
exports.useRestaurantStore = (0, zustand_1.create)()((0, middleware_1.persist)((set, get) => ({
    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrder: [],
    createRestaurant: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    getRestaurant: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.get(`${API_END_POINT}/`);
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.restaurant });
            }
        }
        catch (error) {
            if (error.response.status === 404) {
                set({ restaurant: null });
            }
            set({ loading: false });
        }
    }),
    updateRestaurant: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    searchRestaurant: (searchText, searchQuery, selectedCuisines) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(","));
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = yield axios_1.default.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                set({ loading: false, searchedRestaurant: response.data });
            }
        }
        catch (error) {
            set({ loading: false });
        }
    }),
    addMenuToRestaurant: (menu) => {
        set((state) => ({
            restaurant: state.restaurant ? Object.assign(Object.assign({}, state.restaurant), { menus: [...state.restaurant.menus, menu] }) : null,
        }));
    },
    updateMenuToRestaurant: (updatedMenu) => {
        set((state) => {
            if (state.restaurant) {
                const updatedMenuList = state.restaurant.menus.map((menu) => menu._id === updatedMenu._id ? updatedMenu : menu);
                return {
                    restaurant: Object.assign(Object.assign({}, state.restaurant), { menus: updatedMenuList })
                };
            }
            // if state.restaruant is undefined then return state
            return state;
        });
    },
    setAppliedFilter: (value) => {
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
            return { appliedFilter: updatedFilter };
        });
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] });
    },
    getSingleRestaurant: (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${API_END_POINT}/${restaurantId}`);
            if (response.data.success) {
                set({ singleRestaurant: response.data.restaurant });
            }
        }
        catch (error) { }
    }),
    getRestaurantOrders: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${API_END_POINT}/order`);
            if (response.data.success) {
                set({ restaurantOrder: response.data.orders });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateRestaurantOrder: (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.put(`${API_END_POINT}/order/${orderId}/status`, { status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const updatedOrder = get().restaurantOrder.map((order) => {
                    return order._id === orderId ? Object.assign(Object.assign({}, order), { status: response.data.status }) : order;
                });
                set({ restaurantOrder: updatedOrder });
                sonner_1.toast.success(response.data.message);
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
        }
    })
}), {
    name: 'restaurant-name',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage)
}));
