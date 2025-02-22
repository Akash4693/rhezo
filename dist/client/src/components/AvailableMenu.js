"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
const useCartStore_1 = require("@/store/useCartStore");
const react_router_dom_1 = require("react-router-dom");
const AvailableMenu = ({ menus }) => {
    const { addToCart } = (0, useCartStore_1.useCartStore)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu) => (<card_1.Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
            <img src={menu.image} alt="" className="w-full h-40 object-cover"/>
            <card_1.CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </card_1.CardContent>
            <card_1.CardFooter className="p-4">
              <button_1.Button onClick={() => {
                addToCart(menu);
                navigate("/cart");
            }} className="w-full bg-orange hover:bg-hoverOrange">
                Add to Cart
              </button_1.Button>
            </card_1.CardFooter>
          </card_1.Card>))}
      </div>
    </div>);
};
exports.default = AvailableMenu;
