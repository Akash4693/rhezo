"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const separator_1 = require("./ui/separator");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("./ui/button");
const useOrderStore_1 = require("@/store/useOrderStore");
const react_1 = require("react");
const Success = () => {
    const { orders, getOrderDetails } = (0, useOrderStore_1.useOrderStore)();
    (0, react_1.useEffect)(() => {
        getOrderDetails();
    }, []);
    if (orders.length === 0)
        return (<div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>);
    return (<div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status:{" "}
            <span className="text-[#FF5A5A]">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Order Summary
          </h2>
          {/* Your Ordered Item Display here  */}
          {orders.map((order, index) => (<div key={index}>
              {order.cartItems.map((item) => (<div className="mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={item.image} alt="" className="w-14 h-14 rounded-md object-cover"/>
                      <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-800 dark:text-gray-200 flex items-center">
                        <lucide_react_1.IndianRupee />
                        <span className="text-lg font-medium">{item.price}</span>
                      </div>
                    </div>
                  </div>
                  <separator_1.Separator className="my-4"/>
                </div>))}
            </div>))}
        </div>
        <react_router_dom_1.Link to="/cart">
          <button_1.Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
            Continue Shopping
          </button_1.Button>
        </react_router_dom_1.Link>
      </div>
    </div>);
};
exports.default = Success;
