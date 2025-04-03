import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-slice";

export default function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-md"
        >
          <LogOutIcon />
          Logout
        </Button>
      </div>
    </header>
  );
}
