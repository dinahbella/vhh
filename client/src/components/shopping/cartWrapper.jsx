import React, { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cartitemContent";
import { useRouter } from "next/router";

export default function UserCartContent({ cartItems, setOpenCartSheet }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md p-3">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-center">
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} /> // Make sure to provide a unique key
          ))
        ) : (
          <p className="text-lg font-semibold">Your cart is empty</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Total Items:</p>
          <p className="text-lg font-semibold">${totalCartAmount}</p>
        </div>
      </div>
      <Button
        onClick={() => {
          router.push("/shop/checkout");
          setOpenCartSheet(false);
        }}
        disabled={loading}
        className="relative px-6 py-3 text-white font-bold text-lg rounded-lg transition-all  mt-6
      duration-300 ease-in-out bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>💳 Checkout</>
        )}
      </Button>{" "}
    </SheetContent>
  );
}
