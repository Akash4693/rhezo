"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lucide_react_1 = require("lucide-react");
const Loading = () => {
    return (<div className="min-h-screen bg-gradient-to-br from-gray-900 via-bg-lightGreen to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <lucide_react_1.Loader className="animate-spin w-16 h-16 text-white"/>
    </div>);
};
exports.default = Loading;
