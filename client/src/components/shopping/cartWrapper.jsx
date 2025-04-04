import React, { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

export default function UserCartContent() {
  const [loading, setLoading] = useState(false);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-center">
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-x-4"></div>
      <div className="mt-8 space-x-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Total Items:</p>
          <p className="text-lg font-semibold">$2000</p>
        </div>
      </div>
      <Button
        // onClick={handleCheckout}
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
