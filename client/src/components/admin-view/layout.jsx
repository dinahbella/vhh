import React, { useEffect, useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import CheckAuth from "../common/check-auth";
import { useSelector } from "react-redux";
import { checkAuth } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLayout({ children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading)
    return <Skeleton className="w-full bg-primary  min-h-screen" />;

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        {/*  admin sidebar */}
        <div className=" flex flex-1 flex-col">
          {/* admin hheader */}
          <AdminHeader setOpen={setOpenSidebar} />
          <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </CheckAuth>
  );
}
