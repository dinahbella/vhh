import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full">
      {/*  admin sidebar */}
      <div className=" flex flex-1 flex-col">
        {/* admin hheader */}
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
