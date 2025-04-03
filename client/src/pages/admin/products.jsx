import ProductImage from "@/components/admin-view/image-upload";
import AdminLayout from "@/components/admin-view/layout";
import AdminProductTile from "@/components/admin-view/productTile";
import Form from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, getAllProducts } from "@/store/admin/productSlice";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

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
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload.success) {
        setOpenCreateProducts(false);
        dispatch(getAllProducts());
        setImageFile(null);
        setFormData(initialStateFormData);
        toast.success("Product Added Successfully");
      }
    });
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  console.log(productList);

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

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <AdminProductTile product={productItem} />
              ))
            : null}
        </div>
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
              setImageLoading={setImageLoading}
              imageLoading={imageLoading}
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
