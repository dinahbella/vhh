import Address from "@/components/shopping/address";
import AdminShoppingLayout from "@/components/shopping/layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/cartitemContent";
import { Button } from "@/components/ui/button";
export default function Checkout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  function handleInitiatePaypalPayment() {}
  return (
    <AdminShoppingLayout>
      <div className="flex flex-col">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src="/img.png"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
          <Address />
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent cartItem={item} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button
                onClick={handleInitiatePaypalPayment}
                className="w-full font-medium hover:bg-green-900"
              >
                {isPaymentStart
                  ? "Processing Paypal Payment..."
                  : "Checkout with Paypal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminShoppingLayout>
  );
}
