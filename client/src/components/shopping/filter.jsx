import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ProductFilter() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-green-600 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold tracking-wide animate-fade-in">
          Filters
        </h2>
      </div>

      {/* Filter Options */}
      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-700 relative before:absolute before:w-6 before:h-[2px] before:bg-green-500 before:-bottom-1 before:left-0">
                {keyItem}
              </h3>

              <div className="grid gap-3 mt-2">
                {filterOptions[keyItem].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1"
                  >
                    <Checkbox
                      className="w-5 h-5 border-gray-300 rounded focus:ring-green-500 transition-all duration-300 ease-in-out 
                          hover:scale-105 active:scale-95 checked:bg-green-600 checked:border-green-600"
                    />

                    <Label
                      htmlFor={item.id}
                      className="text-sm font-medium text-gray-800 cursor-pointer transition-colors duration-300 hover:text-green-600"
                    >
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {index !== Object.keys(filterOptions).length - 1 && (
              <Separator className="border border-green-400 border-dashed opacity-80 transition-opacity duration-300 hover:opacity-100 my-5" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
