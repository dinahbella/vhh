import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Form from "../common/form";

const initialFormData = {
  status: "",
};

export default function OrderDetails() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus() {
    // update order logic here
  }

  return (
    <DialogContent className="max-w-[90vw] sm:max-w-[700px]">
      <div className="grid gap-6 p-2">
        {/* Order Meta */}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Order ID</p>
              <Label>12345</Label>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Order Date</p>
              <Label>12th April, 2025</Label>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Order Status</p>
              <Label className="text-yellow-600">In Progress</Label>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Order Total</p>
              <Label className="text-green-600 font-bold">$500</Label>
            </div>
          </div>
        </div>

        <Separator className="border-primary border-dashed" />

        {/* Order Items */}
        <div className="grid gap-3">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Products
          </h3>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Product 1</span>
              <span>$100</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Product 2</span>
              <span>$200</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Product 3</span>
              <span>$200</span>
            </li>
          </ul>
        </div>

        <Separator className="border-muted" />

        {/* Shipping Info */}
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Shipping Information
          </h3>
          <div className="grid gap-1 text-sm text-muted-foreground">
            <span className="font-medium text-primary">John Doe</span>
            <span>123 Main Street</span>
            <span>Lagos</span>
            <span>100001</span>
            <span>+234-800-123-4567</span>
            <span>Leave at front desk</span>
          </div>
        </div>

        <Separator className="border-muted" />

        {/* Status Update Form */}
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Update Status
          </h3>
          <Form
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
            isBtnDisabled={!formData.status}
          />
        </div>
      </div>
    </DialogContent>
  );
}
