"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Footer_1 = __importDefault(require("@/components/Footer"));
const Navbar_1 = __importDefault(require("@/components/Navbar"));
const react_router_dom_1 = require("react-router-dom");
const MainLayout = () => {
    return (<div className="flex flex-col min-h-screen m-2 md:m-0">
        {/* Navbar  */}
        <header>
            <Navbar_1.default />
        </header>
        {/* Main content  */} 
        <div className="flex-1">
            <react_router_dom_1.Outlet />
        </div>

        {/* Footer  */}
        <footer>
            <Footer_1.default />
        </footer>
    </div>);
};
exports.default = MainLayout;
