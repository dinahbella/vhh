import ProductFilter from "@/components/shopping/filter";
import AdminShoppingLayout from "@/components/shopping/layout";
import ShoppingProductTile from "@/components/shopping/productCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getFilteredProducts } from "@/store/shop/productSlice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Listing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(value) {
    setSort(value);
  }
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilter(cpyFilters);
    sessionStorage.setItem("filter", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    dispatch(getFilteredProducts());
  }, [dispatch]);
  return (
    <AdminShoppingLayout>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filter={filter} handleFilter={handleFilter} />

        {/* Product Listing Section */}
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList.length} Products
              </span>
            </div>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 px-4 py-2 border border-gray-300 
                  rounded-md shadow-sm transition-all duration-300 hover:shadow-md 
                  hover:bg-green-600 hover:text-white active:scale-95"
                >
                  <ArrowUpDownIcon className="h-4 w-4 text-green-600 transition-transform duration-300 group-hover:rotate-180" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>

              {/* Dropdown Content */}
              <DropdownMenuContent
                align="end"
                className="w-[200px] mt-2 bg-white border border-gray-200 
                rounded-lg shadow-lg animate-fade-in-down"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="flex items-center gap-2  text-sm text-gray-700 
                      rounded-sm transition-all duration-150 hover:bg-green-100 
                      hover:text-green-800 focus:bg-green-100 focus:text-green-800
                      data-[state=checked]:bg-green-600 data-[state=checked]:text-white"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0 ? (
              productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  product={productItem}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminShoppingLayout>
  );
}
