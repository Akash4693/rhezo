"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const lucide_react_1 = require("lucide-react");
const react_1 = __importStar(require("react"));
const EditMenu_1 = __importDefault(require("./EditMenu"));
const menuSchema_1 = require("@/schema/menuSchema");
const useMenuStore_1 = require("@/store/useMenuStore");
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const AddMenu = () => {
    var _a;
    const [input, setInput] = (0, react_1.useState)({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const [open, setOpen] = (0, react_1.useState)(false);
    const [editOpen, setEditOpen] = (0, react_1.useState)(false);
    const [selectedMenu, setSelectedMenu] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)({});
    const { loading, createMenu } = (0, useMenuStore_1.useMenuStore)();
    const { restaurant } = (0, useRestaurantStore_1.useRestaurantStore)();
    const changeEventHandler = (e) => {
        const { name, value, type } = e.target;
        setInput(Object.assign(Object.assign({}, input), { [name]: type === "number" ? Number(value) : value }));
    };
    const submitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const result = menuSchema_1.menuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors);
            return;
        }
        // api ka kaam start from here
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if (input.image) {
                formData.append("image", input.image);
            }
            yield createMenu(formData);
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <dialog_1.Dialog open={open} onOpenChange={setOpen}>
          <dialog_1.DialogTrigger>
            <button_1.Button className="bg-orange hover:bg-hoverOrange">
              <lucide_react_1.Plus className="mr-2"/>
              Add Menus
            </button_1.Button>
          </dialog_1.DialogTrigger>
          <dialog_1.DialogContent>
            <dialog_1.DialogHeader>
              <dialog_1.DialogTitle>Add A New Menu</dialog_1.DialogTitle>
              <dialog_1.DialogDescription>
                Create a menu that will make your restaurant stand out.
              </dialog_1.DialogDescription>
            </dialog_1.DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label_1.Label>Name</label_1.Label>
                <input_1.Input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter menu name"/>
                {error && (<span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Description</label_1.Label>
                <input_1.Input type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter menu description"/>
                {error && (<span className="text-xs font-medium text-red-600">
                    {error.description}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Price in (Rupees)</label_1.Label>
                <input_1.Input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Enter menu price"/>
                {error && (<span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Upload Menu Image</label_1.Label>
                <input_1.Input type="file" name="image" onChange={(e) => {
            var _a;
            return setInput(Object.assign(Object.assign({}, input), { image: ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || undefined }));
        }}/>
                {error && (<span className="text-xs font-medium text-red-600">
                    {(_a = error.image) === null || _a === void 0 ? void 0 : _a.name}
                  </span>)}
              </div>
              <dialog_1.DialogFooter className="mt-5">
                {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                    <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                    Please wait
                  </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                    Submit
                  </button_1.Button>)}
              </dialog_1.DialogFooter>
            </form>
          </dialog_1.DialogContent>
        </dialog_1.Dialog>
      </div>
      {restaurant === null || restaurant === void 0 ? void 0 : restaurant.menus.map((menu, idx) => (<div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img src={menu.image} alt="" className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"/>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm tex-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">80</span>
              </h2>
            </div>
            <button_1.Button onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
            }} size={"sm"} className="bg-orange hover:bg-hoverOrange mt-2">
              Edit
            </button_1.Button>
          </div>
        </div>))}
      <EditMenu_1.default selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen}/>
    </div>);
};
exports.default = AddMenu;
