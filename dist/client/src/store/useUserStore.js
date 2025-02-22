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
exports.useUserStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const axios_1 = __importDefault(require("axios"));
const sonner_1 = require("sonner");
const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/user";
axios_1.default.defaults.withCredentials = true;
exports.useUserStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    // signup api implementation
    signup: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    login: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    verifyEmail: (verificationCode) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error) {
            sonner_1.toast.success(error.response.data.message);
            set({ loading: false });
        }
    }),
    checkAuthentication: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ isCheckingAuth: true });
            const response = yield axios_1.default.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        }
        catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/logout`);
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
            set({ loading: false });
        }
    }),
    forgotPassword: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/forgot-password`, { email });
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
    resetPassword: (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            set({ loading: true });
            const response = yield axios_1.default.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
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
    updateProfile: (input) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                sonner_1.toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
            }
        }
        catch (error) {
            sonner_1.toast.error(error.response.data.message);
        }
    })
}), {
    name: 'user-name',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
