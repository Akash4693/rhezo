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
const input_1 = require("@/components/ui/input");
const separator_1 = require("@/components/ui/separator");
const userSchema_1 = require("@/schema/userSchema");
const useUserStore_1 = require("@/store/useUserStore");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
// typescript me type define krne ka 2 trika hota hai
const Signup = () => {
    const [input, setInput] = (0, react_1.useState)({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const { signup, loading } = (0, useUserStore_1.useUserStore)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(Object.assign(Object.assign({}, input), { [name]: value }));
    };
    const loginSubmitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        // form validation check start
        const result = userSchema_1.userSignupSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors);
            return;
        }
        // login api implementation start here
        try {
            yield signup(input);
            navigate("/verify-email");
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<div className="flex items-center justify-center min-h-screen">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">PatelEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="text" placeholder="Full Name" name="fullname" value={input.fullname} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.fullname}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="email" placeholder="Email" name="email" value={input.email} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="password" placeholder="Password" name="password" value={input.password} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input_1.Input type="text" placeholder="Contact" name="contact" value={input.contact} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1"/>
            <lucide_react_1.PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {errors && <span className="text-xs text-red-500">{errors.contact}</span>}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (<button_1.Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
            </button_1.Button>) : (<button_1.Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Signup
            </button_1.Button>)}
        </div>
        <separator_1.Separator />
        <p className="mt-2">
            Already have an account?{" "}
            <react_router_dom_1.Link to="/login" className="text-blue-500">Login</react_router_dom_1.Link>
        </p>
      </form>
    </div>);
};
exports.default = Signup;
