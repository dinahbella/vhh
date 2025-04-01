import React from "react";
import ShoppingHeader from "./header";
import CheckAuth from "../common/check-auth";

export default function AdminShoppingLayout({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* header */}
        <ShoppingHeader />
        <main className="flex flex-col w-full">{children}</main>
      </div>
    </CheckAuth>
  );
}
