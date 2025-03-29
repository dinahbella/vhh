import React from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import CheckAuth from "../common/check-auth";

export default function AdminLayout({ children }) {
  const isAuthenticated = false;
  const user = null;
  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        {/*  admin sidebar */}
        <div className=" flex flex-1 flex-col">
          {/* admin hheader */}
          <AdminHeader />
          <main className="flex-1 flex bg-muted/40 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </CheckAuth>
  );
}
