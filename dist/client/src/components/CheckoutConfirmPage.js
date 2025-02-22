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
const react_1 = require("react");
const dialog_1 = require("./ui/dialog");
const react_dialog_1 = require("@radix-ui/react-dialog");
const label_1 = require("./ui/label");
const input_1 = require("./ui/input");
const button_1 = require("./ui/button");
const useUserStore_1 = require("@/store/useUserStore");
const useCartStore_1 = require("@/store/useCartStore");
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const useOrderStore_1 = require("@/store/useOrderStore");
const lucide_react_1 = require("lucide-react");
const CheckoutConfirmPage = ({ open, setOpen, }) => {
    const { user } = (0, useUserStore_1.useUserStore)();
    const [input, setInput] = (0, react_1.useState)({
        name: (user === null || user === void 0 ? void 0 : user.fullname) || "",
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        contact: (user === null || user === void 0 ? void 0 : user.contact.toString()) || "",
        address: (user === null || user === void 0 ? void 0 : user.address) || "",
        city: (user === null || user === void 0 ? void 0 : user.city) || "",
        country: (user === null || user === void 0 ? void 0 : user.country) || "",
    });
    const { cart } = (0, useCartStore_1.useCartStore)();
    const { restaurant } = (0, useRestaurantStore_1.useRestaurantStore)();
    const { createCheckoutSession, loading } = (0, useOrderStore_1.useOrderStore)();
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(Object.assign(Object.assign({}, input), { [name]: value }));
    };
    const checkoutHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // api implementation start from here
        try {
            const checkoutData = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price.toString(),
                    quantity: cartItem.quantity.toString(),
                })),
                deliveryDetails: input,
                restaurantId: restaurant === null || restaurant === void 0 ? void 0 : restaurant._id,
            };
            yield createCheckoutSession(checkoutData);
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<dialog_1.Dialog open={open} onOpenChange={setOpen}>
      <dialog_1.DialogContent>
        <react_dialog_1.DialogTitle className="font-semibold">Review Your Order</react_dialog_1.DialogTitle>
        <dialog_1.DialogDescription className="text-xs">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </dialog_1.DialogDescription>
        <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
          <div>
            <label_1.Label>Fullname</label_1.Label>
            <input_1.Input type="text" name="name" value={input.name} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Email</label_1.Label>
            <input_1.Input disabled type="email" name="email" value={input.email} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Contact</label_1.Label>
            <input_1.Input type="text" name="contact" value={input.contact} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Address</label_1.Label>
            <input_1.Input type="text" name="address" value={input.address} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>City</label_1.Label>
            <input_1.Input type="text" name="city" value={input.city} onChange={changeEventHandler}/>
          </div>
          <div>
            <label_1.Label>Country</label_1.Label>
            <input_1.Input type="text" name="country" value={input.country} onChange={changeEventHandler}/>
          </div>
          <dialog_1.DialogFooter className="col-span-2 pt-5">
            {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                Continue To Payment
              </button_1.Button>)}
          </dialog_1.DialogFooter>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = CheckoutConfirmPage;
