"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const input_1 = require("./ui/input");
const lucide_react_1 = require("lucide-react");
const button_1 = require("./ui/button");
const hero_pizza_png_1 = __importDefault(require("@/assets/hero_pizza.png"));
const react_router_dom_1 = require("react-router-dom");
const HereSection = () => {
    const [searchText, setSearchText] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicios food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <input_1.Input type="text" value={searchText} placeholder="Search restaurant by name, city & country" onChange={(e) => setSearchText(e.target.value)} className="pl-10 shadow-lg"/>
          <lucide_react_1.Search className="text-gray-500 absolute inset-y-2 left-2"/>
          <button_1.Button onClick={() => navigate(`/search/${searchText}`)} className="bg-orange hover:bg-hoverOrange">Search</button_1.Button>
        </div>
      </div>
      <div>
        <img src={hero_pizza_png_1.default} alt="" className="object-cover w-full max-h-[500px]"/>
      </div>
    </div>);
};
exports.default = HereSection;
