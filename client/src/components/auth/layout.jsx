import React from "react";
import CheckAuth from "../common/check-auth";

export default function AuthLayout({ children }) {
  const isAuthenticated = false;
  const user = null;
  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className=" flex min-h-screen w-full">
        <div className="hidden  lg:flex w-1/2 px-12 items-center justify-center  bg-primary">
          <div className="max-w-md space-y-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-300">
              {" "}
              Welcome to Virtual Health Hub
            </h1>
          </div>
        </div>
        <div className=" flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </CheckAuth>
  );
}
