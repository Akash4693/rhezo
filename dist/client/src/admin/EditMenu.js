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
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const menuSchema_1 = require("@/schema/menuSchema");
const useMenuStore_1 = require("@/store/useMenuStore");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const EditMenu = ({ selectedMenu, editOpen, setEditOpen, }) => {
    var _a;
    const [input, setInput] = (0, react_1.useState)({
        name: "",
        description: "",
        price: 0,
        image: undefined,
    });
    const [error, setError] = (0, react_1.useState)({});
    const { loading, editMenu } = (0, useMenuStore_1.useMenuStore)();
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
            yield editMenu(selectedMenu._id, formData);
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        setInput({
            name: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.name) || "",
            description: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.description) || "",
            price: (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.price) || 0,
            image: undefined,
        });
    }, [selectedMenu]);
    return (<dialog_1.Dialog open={editOpen} onOpenChange={setEditOpen}>
      <dialog_1.DialogContent>
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Edit Menu</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label_1.Label>Name</label_1.Label>
            <input_1.Input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter menu name"/>
            {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
          </div>
          <div>
            <label_1.Label>Description</label_1.Label>
            <input_1.Input type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter menu description"/>
            {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
          </div>
          <div>
            <label_1.Label>Price in (Rupees)</label_1.Label>
            <input_1.Input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Enter menu price"/>
            {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
          </div>
          <div>
            <label_1.Label>Upload Menu Image</label_1.Label>
            <input_1.Input type="file" name="image" onChange={(e) => { var _a; return setInput(Object.assign(Object.assign({}, input), { image: ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || undefined })); }}/>
            {error && <span className="text-xs font-medium text-red-600">{(_a = error.image) === null || _a === void 0 ? void 0 : _a.name}</span>}
          </div>
          <dialog_1.DialogFooter className="mt-5">
            {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                Please wait
              </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">Submit</button_1.Button>)}
          </dialog_1.DialogFooter>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
};
exports.default = EditMenu;
