"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const menubar_1 = require("./ui/menubar");
const dropdown_menu_1 = require("./ui/dropdown-menu");
const button_1 = require("./ui/button");
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("./ui/avatar");
const sheet_1 = require("./ui/sheet");
const separator_1 = require("./ui/separator");
const useUserStore_1 = require("@/store/useUserStore");
const useCartStore_1 = require("@/store/useCartStore");
const useThemeStore_1 = require("@/store/useThemeStore");
const Navbar = () => {
    const { user, loading, logout } = (0, useUserStore_1.useUserStore)();
    const { cart } = (0, useCartStore_1.useCartStore)();
    const { setTheme } = (0, useThemeStore_1.useThemeStore)();
    return (<div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <react_router_dom_1.Link to="/">
          <h1 className="font-bold md:font-extrabold text-2xl">PatelEats</h1>
        </react_router_dom_1.Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <react_router_dom_1.Link to="/">Home</react_router_dom_1.Link>
            <react_router_dom_1.Link to="/profile">Profile</react_router_dom_1.Link>
            <react_router_dom_1.Link to="/order/status">Order</react_router_dom_1.Link>

            {(user === null || user === void 0 ? void 0 : user.admin) && (<menubar_1.Menubar>
                <menubar_1.MenubarMenu>
                  <menubar_1.MenubarTrigger>Dashboard</menubar_1.MenubarTrigger>
                  <menubar_1.MenubarContent>
                    <react_router_dom_1.Link to="/admin/restaurant">
                      <menubar_1.MenubarItem>Restaurant</menubar_1.MenubarItem>
                    </react_router_dom_1.Link>
                    <react_router_dom_1.Link to="/admin/menu">
                      <menubar_1.MenubarItem>Menu</menubar_1.MenubarItem>
                    </react_router_dom_1.Link>
                    <react_router_dom_1.Link to="/admin/orders">
                      <menubar_1.MenubarItem>Orders</menubar_1.MenubarItem>
                    </react_router_dom_1.Link>
                  </menubar_1.MenubarContent>
                </menubar_1.MenubarMenu>
              </menubar_1.Menubar>)}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <dropdown_menu_1.DropdownMenu>
                <dropdown_menu_1.DropdownMenuTrigger asChild>
                  <button_1.Button variant="outline" size="icon">
                    <lucide_react_1.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <lucide_react_1.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                  </button_1.Button>
                </dropdown_menu_1.DropdownMenuTrigger>
                <dropdown_menu_1.DropdownMenuContent align="end">
                  <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('light')}>Light</dropdown_menu_1.DropdownMenuItem>
                  <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('dark')}>Dark</dropdown_menu_1.DropdownMenuItem>
                </dropdown_menu_1.DropdownMenuContent>
              </dropdown_menu_1.DropdownMenu>
            </div>
            <react_router_dom_1.Link to="/cart" className="relative cursor-pointer">
              <lucide_react_1.ShoppingCart />
              {cart.length > 0 && (<button_1.Button size={"icon"} className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500">
                  {cart.length}
                </button_1.Button>)}
            </react_router_dom_1.Link>
            <div>
              <avatar_1.Avatar>
                <avatar_1.AvatarImage src={user === null || user === void 0 ? void 0 : user.profilePicture} alt="profilephoto"/>
                <avatar_1.AvatarFallback>CN</avatar_1.AvatarFallback>
              </avatar_1.Avatar>
            </div>
            <div>
              {loading ? (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                  <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </button_1.Button>) : (<button_1.Button onClick={logout} className="bg-orange hover:bg-hoverOrange">
                  Logout
                </button_1.Button>)}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive  */}
          <MobileNavbar />
        </div>
      </div>
    </div>);
};
exports.default = Navbar;
const MobileNavbar = () => {
    const { user, logout, loading } = (0, useUserStore_1.useUserStore)();
    const { setTheme } = (0, useThemeStore_1.useThemeStore)();
    return (<sheet_1.Sheet>
      <sheet_1.SheetTrigger asChild>
        <button_1.Button size={"icon"} className="rounded-full bg-gray-200 text-black hover:bg-gray-200" variant="outline">
          <lucide_react_1.Menu size={"18"}/>
        </button_1.Button>
      </sheet_1.SheetTrigger>
      <sheet_1.SheetContent className="flex flex-col">
        <sheet_1.SheetHeader className="flex flex-row items-center justify-between mt-2">
          <sheet_1.SheetTitle>PatelEats</sheet_1.SheetTitle>
          <dropdown_menu_1.DropdownMenu>
            <dropdown_menu_1.DropdownMenuTrigger asChild>
              <button_1.Button variant="outline" size="icon">
                <lucide_react_1.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                <lucide_react_1.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                <span className="sr-only">Toggle theme</span>
              </button_1.Button>
            </dropdown_menu_1.DropdownMenuTrigger>
            <dropdown_menu_1.DropdownMenuContent align="end">
              <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('light')}>Light</dropdown_menu_1.DropdownMenuItem>
              <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('dark')}>Dark</dropdown_menu_1.DropdownMenuItem>
            </dropdown_menu_1.DropdownMenuContent>
          </dropdown_menu_1.DropdownMenu>
        </sheet_1.SheetHeader>
        <separator_1.Separator className="my-2"/>
        <sheet_1.SheetDescription className="flex-1">
          <react_router_dom_1.Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <lucide_react_1.User />
            <span>Profile</span>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/order/status" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <lucide_react_1.HandPlatter />
            <span>Order</span>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link to="/cart" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <lucide_react_1.ShoppingCart />
            <span>Cart (0)</span>
          </react_router_dom_1.Link>
          {(user === null || user === void 0 ? void 0 : user.admin) && (<>
              <react_router_dom_1.Link to="/admin/menu" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                <lucide_react_1.SquareMenu />
                <span>Menu</span>
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                <lucide_react_1.UtensilsCrossed />
                <span>Restaurant</span>
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/admin/orders" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
                <lucide_react_1.PackageCheck />
                <span>Restaurant Orders</span>
              </react_router_dom_1.Link>
            </>)}
        </sheet_1.SheetDescription>
        <sheet_1.SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <avatar_1.Avatar>
              <avatar_1.AvatarImage src={user === null || user === void 0 ? void 0 : user.profilePicture}/>
              <avatar_1.AvatarFallback>CN</avatar_1.AvatarFallback>
            </avatar_1.Avatar>
            <h1 className="font-bold">Patel Mernstack</h1>
          </div>
          <sheet_1.SheetClose asChild>
            {loading ? (<button_1.Button className="bg-orange hover:bg-hoverOrange">
                <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </button_1.Button>) : (<button_1.Button onClick={logout} className="bg-orange hover:bg-hoverOrange">
                Logout
              </button_1.Button>)}
          </sheet_1.SheetClose>
        </sheet_1.SheetFooter>
      </sheet_1.SheetContent>
    </sheet_1.Sheet>);
};
