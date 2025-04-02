import { adminSidebarMenu } from "@/config";
import { ChartNoAxesCombined } from "lucide-react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const MenuItems = ({ setOpen }) => {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenu.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            item.path;
            setOpen ? setOpen(false) : null;
          }}
          className="flex text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-black"
        >
          {item.icons}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default function AdminSidebar({ open, setOpen }) {
  const router = useRouter();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-4">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col bg-background p-6 border-r lg:flex">
        <div
          className="flex items-center gap-2 "
          onClick={() => {
            "/admin/dashboard";
          }}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}
