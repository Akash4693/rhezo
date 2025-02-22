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
const useUserStore_1 = require("@/store/useUserStore");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const VerifyEmail = () => {
    const [otp, setOtp] = (0, react_1.useState)(["", "", "", "", "", ""]);
    const inputRef = (0, react_1.useRef)([]);
    const { loading, verifyEmail } = (0, useUserStore_1.useUserStore)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChange = (index, value) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
        // Move to the next input field id a digit is entered
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };
    const submitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const verificationCode = otp.join("");
        try {
            yield verifyEmail(verificationCode);
            navigate("/");
        }
        catch (error) {
            console.log(error);
        }
    });
    return (<div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter, idx) => (<input_1.Input key={idx} ref={(element) => (inputRef.current[idx] = element)} type="text" maxLength={1} value={letter} onChange={(e) => handleChange(idx, e.target.value)} onKeyDown={(e) => handleKeyDown(idx, e)} className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>))}
          </div>
          {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
              Please wait
            </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">
              Verify
            </button_1.Button>)}
        </form>
      </div>
    </div>);
};
exports.default = VerifyEmail;
