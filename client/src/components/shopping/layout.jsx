import React, { useEffect } from "react";
import ShoppingHeader from "./header";
import CheckAuth from "../common/check-auth";
import { checkAuth } from "@/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminShoppingLayout({ children }) {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px] " />;

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
