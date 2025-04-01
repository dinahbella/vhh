"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function CheckAuth({ isAuthenticated, user, children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated and not on login/register pages, redirect to login
    if (
      !isAuthenticated &&
      !(pathname.includes("/login") || pathname.includes("/register"))
    ) {
      return router.push("/auth/login");
    }

    // If authenticated and on login/register, redirect based on role
    if (
      isAuthenticated &&
      (pathname.includes("/login") || pathname.includes("/register"))
    ) {
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        return router.push("/shop/home");
      }
    }

    // If non-admin tries to access admin route, redirect
    if (
      isAuthenticated &&
      user?.role !== "admin" &&
      pathname.includes("/admin")
    ) {
      return router.push("/unauth-page");
    }

    // If admin tries to access shop route, redirect to admin dashboard
    if (
      isAuthenticated &&
      user?.role === "admin" &&
      pathname.includes("/shop")
    ) {
      return router.push("/admin/dashboard");
    }
  }, [isAuthenticated, pathname, router, user?.role]);

  return <>{children}</>;
}
