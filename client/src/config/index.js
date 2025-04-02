import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBagIcon,
  ShoppingBasket,
} from "lucide-react";
import React from "react";

export const RegisterFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: " Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: " Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const LoginFormControls = [
  {
    name: "email",
    label: " Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: " Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
export const adminSidebarMenu = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BadgeCheck />,
  },
];
