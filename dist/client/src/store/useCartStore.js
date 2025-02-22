"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
exports.useCartStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({
    cart: [],
    addToCart: (item) => {
        set((state) => {
            const exisitingItem = state.cart.find((cartItem) => cartItem._id === item._id);
            if (exisitingItem) {
                // already added in cart then inc qty
                return {
                    cart: state === null || state === void 0 ? void 0 : state.cart.map((cartItem) => cartItem._id === item._id ? Object.assign(Object.assign({}, cartItem), { quantity: cartItem.quantity + 1 }) : cartItem)
                };
            }
            else {
                // add cart
                return {
                    cart: [...state.cart, Object.assign(Object.assign({}, item), { quantity: 1 })]
                };
            }
        });
    },
    clearCart: () => {
        set({ cart: [] });
    },
    removeFromTheCart: (id) => {
        set((state) => ({
            cart: state.cart.filter((item) => item._id !== id)
        }));
    },
    incrementQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id ? Object.assign(Object.assign({}, item), { quantity: item.quantity + 1 }) : item)
        }));
    },
    decrementQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? Object.assign(Object.assign({}, item), { quantity: item.quantity - 1 }) : item)
        }));
    }
}), {
    name: 'cart-name',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage)
}));
