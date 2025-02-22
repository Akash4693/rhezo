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
const label_1 = require("@/components/ui/label");
const restaurantSchema_1 = require("@/schema/restaurantSchema");
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const Restaurant = () => {
    var _a;
    const [input, setInput] = (0, react_1.useState)({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    });
    const [errors, setErrors] = (0, react_1.useState)({});
    const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant, } = (0, useRestaurantStore_1.useRestaurantStore)();
    const changeEventHandler = (e) => {
        const { name, value, type } = e.target;
        setInput(Object.assign(Object.assign({}, input), { [name]: type === "number" ? Number(value) : value }));
    };
    const submitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const result = restaurantSchema_1.restaurantFromSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors);
            return;
        }
        // add restaurant api implementation start from here
        try {
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("country", input.country);
            formData.append("deliveryTime", input.deliveryTime.toString());
            formData.append("cuisines", JSON.stringify(input.cuisines));
            if (input.imageFile) {
                formData.append("imageFile", input.imageFile);
            }
            if (restaurant) {
                // update
                yield updateRestaurant(formData);
            }
            else {
                // create
                yield createRestaurant(formData);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        const fetchRestaurant = () => __awaiter(void 0, void 0, void 0, function* () {
            yield getRestaurant();
            if (restaurant) {
                setInput({
                    restaurantName: restaurant.restaurantName || "",
                    city: restaurant.city || "",
                    country: restaurant.country || "",
                    deliveryTime: restaurant.deliveryTime || 0,
                    cuisines: restaurant.cuisines
                        ? restaurant.cuisines.map((cuisine) => cuisine)
                        : [],
                    imageFile: undefined,
                });
            }
            ;
        });
        fetchRestaurant();
        console.log(restaurant);
    }, []);
    return (<div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name  */}
              <div>
                <label_1.Label>Restaurant Name</label_1.Label>
                <input_1.Input type="text" name="restaurantName" value={input.restaurantName} onChange={changeEventHandler} placeholder="Enter your restaurant name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>)}
              </div>
              <div>
                <label_1.Label>City</label_1.Label>
                <input_1.Input type="text" name="city" value={input.city} onChange={changeEventHandler} placeholder="Enter your city name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Country</label_1.Label>
                <input_1.Input type="text" name="country" value={input.country} onChange={changeEventHandler} placeholder="Enter your country name"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Delivery Time</label_1.Label>
                <input_1.Input type="number" name="deliveryTime" value={input.deliveryTime} onChange={changeEventHandler} placeholder="Enter your delivery time"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Cuisines</label_1.Label>
                <input_1.Input type="text" name="cuisines" value={input.cuisines} onChange={(e) => setInput(Object.assign(Object.assign({}, input), { cuisines: e.target.value.split(",") }))} placeholder="e.g. Momos, Biryani"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>)}
              </div>
              <div>
                <label_1.Label>Upload Restaurant Banner</label_1.Label>
                <input_1.Input onChange={(e) => {
            var _a;
            return setInput(Object.assign(Object.assign({}, input), { imageFile: ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || undefined }));
        }} type="file" accept="image/*" name="imageFile"/>
                {errors && (<span className="text-xs text-red-600 font-medium">
                    {(_a = errors.imageFile) === null || _a === void 0 ? void 0 : _a.name}
                  </span>)}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (<button_1.Button disabled className="bg-orange hover:bg-hoverOrange">
                  <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </button_1.Button>) : (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                  {restaurant
                ? "Update Your Restaurant"
                : "Add Your Restaurant"}
                </button_1.Button>)}
            </div>
          </form>
        </div>
      </div>
    </div>);
};
exports.default = Restaurant;
