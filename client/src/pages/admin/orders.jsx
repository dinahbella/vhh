import AdminLayout from "@/components/admin-view/layout";
import AdminOrdersView from "@/components/admin-view/orders";
import React from "react";

export default function Orders() {
  return (
    <AdminLayout>
      <div>
        <AdminOrdersView />
      </div>
    </AdminLayout>
  );
}
