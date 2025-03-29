import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className=" flex min-h-screen w-full">
      <div className="hidden  lg:flex w-1/2 px-12 items-center justify-center  bg-black">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {" "}
            Welcome to Virtual Health Hub
          </h1>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
