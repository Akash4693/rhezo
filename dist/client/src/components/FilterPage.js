"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useRestaurantStore_1 = require("@/store/useRestaurantStore");
const button_1 = require("./ui/button");
const checkbox_1 = require("./ui/checkbox");
const label_1 = require("./ui/label");
// agar applied filter k andr ye item exixt krta hia toh iska mtlb checked hai
const filterOptions = [
    { id: "burger", label: "Burger" },
    { id: "thali", label: "Thali" },
    { id: "biryani", label: "Biryani" },
    { id: "momos", label: "Momos" },
];
const FilterPage = () => {
    const { setAppliedFilter, appliedFilter, resetAppliedFilter } = (0, useRestaurantStore_1.useRestaurantStore)();
    const appliedFilterHandler = (value) => {
        setAppliedFilter(value);
    };
    return (<div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <button_1.Button variant={"link"} onClick={resetAppliedFilter}>Reset</button_1.Button>
      </div>
      {filterOptions.map((option) => (<div key={option.id} className="flex items-center space-x-2 my-5">
          <checkbox_1.Checkbox id={option.id} checked={appliedFilter.includes(option.label)} onClick={() => appliedFilterHandler(option.label)}/>
          <label_1.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label}
          </label_1.Label>
        </div>))}
    </div>);
};
exports.default = FilterPage;
