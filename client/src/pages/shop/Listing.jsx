import ProductFilter from "@/components/shopping/filter";
import AdminShoppingLayout from "@/components/shopping/layout";
import ShoppingProductTile from "@/components/shopping/productCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getAllProducts } from "@/store/admin/productSlice";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Listing() {
  const diaspatch = useDispatch();

  return (
    <AdminShoppingLayout>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
        <ProductFilter />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className=" text-lg font-extrabold"> All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">10 Products</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4 text-primary" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      className="flex items-center gap-2 hover:bg-primary
                      hover:text-white"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
          <ShoppingProductTile />
        </div>
      </div>
    </AdminShoppingLayout>
  );
}
