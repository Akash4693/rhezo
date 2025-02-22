"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("./ui/avatar");
const button_1 = require("./ui/button");
const table_1 = require("./ui/table");
const react_1 = require("react");
const CheckoutConfirmPage_1 = __importDefault(require("./CheckoutConfirmPage"));
const useCartStore_1 = require("@/store/useCartStore");
const Cart = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const { cart, decrementQuantity, incrementQuantity } = (0, useCartStore_1.useCartStore)();
    let totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity;
    }, 0);
    return (<div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <button_1.Button variant="link">Clear All</button_1.Button>
      </div>
      <table_1.Table>
        <table_1.TableHeader>
          <table_1.TableRow>
            <table_1.TableHead>Items</table_1.TableHead>
            <table_1.TableHead>Title</table_1.TableHead>
            <table_1.TableHead>Price</table_1.TableHead>
            <table_1.TableHead>Quantity</table_1.TableHead>
            <table_1.TableHead>Total</table_1.TableHead>
            <table_1.TableHead className="text-right">Remove</table_1.TableHead>
          </table_1.TableRow>
        </table_1.TableHeader>
        <table_1.TableBody>
          {cart.map((item) => (<table_1.TableRow>
              <table_1.TableCell>
                <avatar_1.Avatar>
                  <avatar_1.AvatarImage src={item.image} alt=""/>
                  <avatar_1.AvatarFallback>CN</avatar_1.AvatarFallback>
                </avatar_1.Avatar>
              </table_1.TableCell>
              <table_1.TableCell> {item.name}</table_1.TableCell>
              <table_1.TableCell> {item.price}</table_1.TableCell>
              <table_1.TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                  <button_1.Button onClick={() => decrementQuantity(item._id)} size={"icon"} variant={"outline"} className="rounded-full bg-gray-200">
                    <lucide_react_1.Minus />
                  </button_1.Button>
                  <button_1.Button size={"icon"} className="font-bold border-none" disabled variant={"outline"}>
                    {item.quantity}
                  </button_1.Button>
                  <button_1.Button onClick={() => incrementQuantity(item._id)} size={"icon"} className="rounded-full bg-orange hover:bg-hoverOrange" variant={"outline"}>
                    <lucide_react_1.Plus />
                  </button_1.Button>
                </div>
              </table_1.TableCell>
              <table_1.TableCell>{item.price * item.quantity}</table_1.TableCell>
              <table_1.TableCell className="text-right">
                <button_1.Button size={"sm"} className="bg-orange hover:bg-hoverOrange">
                  Remove
                </button_1.Button>
              </table_1.TableCell>
            </table_1.TableRow>))}
        </table_1.TableBody>
        <table_1.TableFooter>
          <table_1.TableRow className="text-2xl font-bold">
            <table_1.TableCell colSpan={5}>Total</table_1.TableCell>
            <table_1.TableCell className="text-right">{totalAmount}</table_1.TableCell>
          </table_1.TableRow>
        </table_1.TableFooter>
      </table_1.Table>
      <div className="flex justify-end my-5">
        <button_1.Button onClick={() => setOpen(true)} className="bg-orange hover:bg-hoverOrange">
          Proceed To Checkout
        </button_1.Button>
      </div>
      <CheckoutConfirmPage_1.default open={open} setOpen={setOpen}/>
    </div>);
};
exports.default = Cart;
