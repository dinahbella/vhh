import React from "react";
import ShoppingHeader from "./header";

export default function AdminShoppingLayout({ children }) {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">{children}</main>
    </div>
  );
}
