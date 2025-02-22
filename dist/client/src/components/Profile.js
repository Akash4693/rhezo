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
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("./ui/avatar");
const react_1 = require("react");
const input_1 = require("./ui/input");
const label_1 = require("./ui/label");
const button_1 = require("./ui/button");
const useUserStore_1 = require("@/store/useUserStore");
const Profile = () => {
    const { user, updateProfile } = (0, useUserStore_1.useUserStore)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [profileData, setProfileData] = (0, react_1.useState)({
        fullname: (user === null || user === void 0 ? void 0 : user.fullname) || "",
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        address: (user === null || user === void 0 ? void 0 : user.address) || "",
        city: (user === null || user === void 0 ? void 0 : user.city) || "",
        country: (user === null || user === void 0 ? void 0 : user.country) || "",
        profilePicture: (user === null || user === void 0 ? void 0 : user.profilePicture) || "",
    });
    const imageRef = (0, react_1.useRef)(null);
    const [selectedProfilePicture, setSelectedProfilePicture] = (0, react_1.useState)(profileData.profilePicture || "");
    const fileChangeHandler = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                setSelectedProfilePicture(result);
                setProfileData((prevData) => (Object.assign(Object.assign({}, prevData), { profilePicture: result })));
            };
            reader.readAsDataURL(file);
        }
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProfileData(Object.assign(Object.assign({}, profileData), { [name]: value }));
    };
    const updateProfileHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            setIsLoading(true);
            yield updateProfile(profileData);
            setIsLoading(false);
        }
        catch (error) {
            setIsLoading(false);
        }
    });
    return (<form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <avatar_1.Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <avatar_1.AvatarImage src={selectedProfilePicture}/>
            <avatar_1.AvatarFallback>CN</avatar_1.AvatarFallback>
            <input ref={imageRef} className="hidden" type="file" accept="image/*" onChange={fileChangeHandler}/>
            <div onClick={() => { var _a; return (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer">
              <lucide_react_1.Plus className="text-white w-8 h-8"/>
            </div>
          </avatar_1.Avatar>
          <input_1.Input type="text" name="fullname" value={profileData.fullname} onChange={changeHandler} className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"/>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.Mail className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Email</label_1.Label>
            <input disabled name="email" value={profileData.email} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.LocateIcon className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Address</label_1.Label>
            <input name="address" value={profileData.address} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.MapPin className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>City</label_1.Label>
            <input name="city" value={profileData.city} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <lucide_react_1.MapPinnedIcon className="text-gray-500"/>
          <div className="w-full">
            <label_1.Label>Country</label_1.Label>
            <input name="country" value={profileData.country} onChange={changeHandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"/>
          </div>
        </div>
      </div>
      <div className="text-center">
        {isLoading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
            <lucide_react_1.Loader2 className="mr-2 w-4 h-4 animate-spin"/>
            Please wait
          </button_1.Button>) : (<button_1.Button type="submit" className="bg-orange hover:bg-hoverOrange">Update</button_1.Button>)}
      </div>
    </form>);
};
exports.default = Profile;
