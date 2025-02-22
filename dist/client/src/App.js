"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./auth/Login"));
const react_router_dom_1 = require("react-router-dom");
const Signup_1 = __importDefault(require("./auth/Signup"));
const ForgotPassword_1 = __importDefault(require("./auth/ForgotPassword"));
const ResetPassword_1 = __importDefault(require("./auth/ResetPassword"));
const VerifyEmail_1 = __importDefault(require("./auth/VerifyEmail"));
const HereSection_1 = __importDefault(require("./components/HereSection"));
const MainLayout_1 = __importDefault(require("./layout/MainLayout"));
const Profile_1 = __importDefault(require("./components/Profile"));
const SearchPage_1 = __importDefault(require("./components/SearchPage"));
const RestaurantDetail_1 = __importDefault(require("./components/RestaurantDetail"));
const Cart_1 = __importDefault(require("./components/Cart"));
const Restaurant_1 = __importDefault(require("./admin/Restaurant"));
const AddMenu_1 = __importDefault(require("./admin/AddMenu"));
const Orders_1 = __importDefault(require("./admin/Orders"));
const Success_1 = __importDefault(require("./components/Success"));
const useUserStore_1 = require("./store/useUserStore");
const react_router_dom_2 = require("react-router-dom");
const react_1 = require("react");
const Loading_1 = __importDefault(require("./components/Loading"));
const useThemeStore_1 = require("./store/useThemeStore");
const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = (0, useUserStore_1.useUserStore)();
    if (!isAuthenticated) {
        return <react_router_dom_2.Navigate to="/login" replace/>;
    }
    if (!(user === null || user === void 0 ? void 0 : user.isVerified)) {
        return <react_router_dom_2.Navigate to="/verify-email" replace/>;
    }
    return children;
};
const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = (0, useUserStore_1.useUserStore)();
    if (isAuthenticated && (user === null || user === void 0 ? void 0 : user.isVerified)) {
        return <react_router_dom_2.Navigate to="/" replace/>;
    }
    return children;
};
const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = (0, useUserStore_1.useUserStore)();
    if (!isAuthenticated) {
        return <react_router_dom_2.Navigate to="/login" replace/>;
    }
    if (!(user === null || user === void 0 ? void 0 : user.admin)) {
        return <react_router_dom_2.Navigate to="/" replace/>;
    }
    return children;
};
const appRouter = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: "/",
        element: (<ProtectedRoutes>
        <MainLayout_1.default />
      </ProtectedRoutes>),
        children: [
            {
                path: "/",
                element: <HereSection_1.default />,
            },
            {
                path: "/profile",
                element: <Profile_1.default />,
            },
            {
                path: "/search/:text",
                element: <SearchPage_1.default />,
            },
            {
                path: "/restaurant/:id",
                element: <RestaurantDetail_1.default />,
            },
            {
                path: "/cart",
                element: <Cart_1.default />,
            },
            {
                path: "/order/status",
                element: <Success_1.default />,
            },
            // admin services start from here
            {
                path: "/admin/restaurant",
                element: <AdminRoute><Restaurant_1.default /></AdminRoute>,
            },
            {
                path: "/admin/menu",
                element: <AdminRoute><AddMenu_1.default /></AdminRoute>,
            },
            {
                path: "/admin/orders",
                element: <AdminRoute><Orders_1.default /></AdminRoute>,
            },
        ],
    },
    {
        path: "/login",
        element: <AuthenticatedUser><Login_1.default /></AuthenticatedUser>,
    },
    {
        path: "/signup",
        element: <AuthenticatedUser><Signup_1.default /></AuthenticatedUser>,
    },
    {
        path: "/forgot-password",
        element: <AuthenticatedUser><ForgotPassword_1.default /></AuthenticatedUser>,
    },
    {
        path: "/reset-password",
        element: <ResetPassword_1.default />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmail_1.default />,
    },
]);
function App() {
    const initializeTheme = (0, useThemeStore_1.useThemeStore)((state) => state.initializeTheme);
    const { checkAuthentication, isCheckingAuth } = (0, useUserStore_1.useUserStore)();
    // checking auth every time when page is loaded
    (0, react_1.useEffect)(() => {
        checkAuthentication();
        initializeTheme();
    }, [checkAuthentication]);
    if (isCheckingAuth)
        return <Loading_1.default />;
    return (<main>
      <react_router_dom_1.RouterProvider router={appRouter}></react_router_dom_1.RouterProvider>
    </main>);
}
exports.default = App;
