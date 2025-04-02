import ProductImage from "@/components/admin-view/image-upload";
import AdminLayout from "@/components/admin-view/layout";
import Form from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useState } from "react";

const initialStateFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export default function Products() {
  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [formData, setFormData] = useState(initialStateFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setOpenCreateProducts(false);
    setFormData(initialStateFormData);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <AdminLayout>
      <Fragment>
        <div className="mb-5 flex justify-end">
          <Button onClick={() => setOpenCreateProducts(true)}>
            Add New Product
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet
          open={openCreateProducts}
          onOpenChange={(open) => {
            if (!open) {
              setFormData(initialStateFormData);
            }
            setOpenCreateProducts(open);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImage
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
            <div className="py-6 px-3">
              <Form
                formData={formData}
                setFormData={handleFormDataChange}
                formControls={addProductFormElements}
                buttonText="Add Product"
                onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </AdminLayout>
  );
}
