import {
  HousePlug,
  LogOutIcon,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/router";
import { logout } from "@/store/auth-slice";
import { usePathname, useSearchParams } from "next/navigation";
import UserCartContent from "./cartWrapper";
import { getCartItems } from "@/store/shop/cartSlice";
import { useCallback } from "react";
import { Label } from "../ui/label";

export function MenuItems() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigate = useCallback(
    (menuItem) => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("filters");

        const isFilterCategory =
          menuItem.id !== "home" &&
          menuItem.id !== "products" &&
          menuItem.id !== "search";

        const currentFilter = isFilterCategory
          ? { category: [menuItem.id] }
          : null;

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        if (pathname.includes("listing") && currentFilter !== null) {
          // Add search params manually
          const params = new URLSearchParams();
          params.set("category", menuItem.id);
          router.push(`${pathname}?${params.toString()}`);
        } else {
          router.push(menuItem.path);
        }
      }
    },
    [pathname, router]
  );
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center justify-center gap-6 lg:flex-row">
      {shoppingHeaderItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="relative inline-block p-4 font-mono text-sm font-medium cursor-pointer 
             transition-all duration-300 ease-in-out 
             hover:text-white hover:shadow-md
             before:absolute before:inset-0 before:bg-primary before:scale-x-0 
             before:transition-transform before:duration-300 before:ease-in-out 
             before:rounded-md before:z-[-1] 
             hover:before:scale-x-100"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

export function HeaderRight() {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const router = useRouter();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  useEffect(() => {
    dispatch(getCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "cartItems");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 md:px-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6 text-primary" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartContent
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-primary">
            <AvatarFallback className="bg-primary text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as{" "}
            <span className="ml-2 font-bold text-primary">
              {user?.userName}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center justify-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6 text-primary" />
              <span className="sr-only">Toggle header menu</span>{" "}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRight />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div>
          {isAuthenticated ? (
            <div className="hidden lg:block">
              {" "}
              <HeaderRight />{" "}
            </div>
          ) : (
            <Button>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
