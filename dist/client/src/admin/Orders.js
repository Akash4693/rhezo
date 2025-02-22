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
Object.defineProperty(exports, "__esModule", { value: true });
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const react_1 = require("react");
const Orders = () => {
    const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } = (0, useRestaurantStore_1.useRestaurantStore)();
    const handleStatusChange = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield updateRestaurantOrder(id, status);
    });
    (0, react_1.useEffect)(() => {
        getRestaurantOrders();
    }, []);
    return (<div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {/* Restaurant Orders diplay here  */}
        {restaurantOrder.map((order) => (<div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Address: </span>
                {order.deliveryDetails.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold">Total Amount: </span>
                {order.totalAmount / 100}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <label_1.Label className="block text-sm font-medium text-gray-700 dark:text-gray300 mb-2">
                Order Status
              </label_1.Label>
              <select_1.Select onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)} defaultValue={order.status}>
                <select_1.SelectTrigger>
                  <select_1.SelectValue placeholder="Select Status"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectGroup>
                    {[
                "Pending",
                "Confirmed",
                "Preparing",
                "OutForDelivery",
                "Delivered",
            ].map((status, index) => (<select_1.SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </select_1.SelectItem>))}
                  </select_1.SelectGroup>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
          </div>))}
      </div>
    </div>);
};
exports.default = Orders;
