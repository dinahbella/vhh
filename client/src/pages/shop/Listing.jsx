import ProductFilter from "@/components/shopping/filter";
import AdminShoppingLayout from "@/components/shopping/layout";
import React from "react";

export default function Listing() {
  return (
    <AdminShoppingLayout>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
        <ProductFilter />
      </div>
    </AdminShoppingLayout>
  );
}
