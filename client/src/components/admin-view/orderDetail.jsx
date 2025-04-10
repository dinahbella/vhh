import React from "react";
import { DialogContent } from "../ui/dialog";

export default function OrderDetails() {
  return (
    <DialogContent className="sma:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">Order ID</p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
