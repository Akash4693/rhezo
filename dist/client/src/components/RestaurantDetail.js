"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const AvailableMenu_1 = __importDefault(require("./AvailableMenu"));
const badge_1 = require("./ui/badge");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RestaurantDetail = () => {
    const params = (0, react_router_dom_1.useParams)();
    const { singleRestaurant, getSingleRestaurant } = (0, useRestaurantStore_1.useRestaurantStore)();
    (0, react_1.useEffect)(() => {
        getSingleRestaurant(params.id);
    }, [params.id]);
    return (<div className="max-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img src={(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.imageUrl) || "Loading..."} alt="res_image" className="object-cover w-full h-full rounded-lg shadow-lg"/>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">{(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.restaurantName) || "Loading..."}</h1>
            <div className="flex gap-2 my-2">
              {singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.cuisines.map((cuisine, idx) => (<badge_1.Badge key={idx}>{cuisine}</badge_1.Badge>))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <lucide_react_1.Timer className="w-5 h-5"/>
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]">{(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.deliveryTime) || "NA"} mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
       {(singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.menus) && <AvailableMenu_1.default menus={singleRestaurant === null || singleRestaurant === void 0 ? void 0 : singleRestaurant.menus}/>} 
      </div>
    </div>);
};
exports.default = RestaurantDetail;
