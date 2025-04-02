import AdminLayout from "@/components/admin-view/layout";
import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";

export default function Products() {
  return (
    <AdminLayout>
      <Fragment>
        <div className="mb-5 flex justify-end">
          <Button>Add New Product</Button>
        </div>
      </Fragment>
    </AdminLayout>
  );
}
