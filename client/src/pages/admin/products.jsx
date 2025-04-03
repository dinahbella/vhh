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
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "@/store/admin/productSlice";
import React, { Fragment, useState, useEffect } from "react";
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
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();

  const { productList, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    try {
      const productData = {
        ...formData,
        image: uploadedImageUrl,
      };

      if (currentEditedId) {
        const result = await dispatch(
          editProduct({
            id: currentEditedId,
            formData: productData,
          })
        );

        if (result.payload?.success) {
          toast.success("Product updated successfully");
          dispatch(getAllProducts());
          resetForm();
        }
      } else {
        const result = await dispatch(addNewProduct(productData));
        if (result.payload?.success) {
          toast.success("Product added successfully");
          dispatch(getAllProducts());
          resetForm();
        }
      }
    } catch (err) {
      toast.error(error?.message || "Operation failed");
      console.error("Product operation error:", err);
    } finally {
      setImageLoading(false);
    }
  };
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast("Product deleted successfully");
        dispatch(getAllProducts());
      }
    });
  }
  const resetForm = () => {
    setFormData(initialStateFormData);
    setImageFile(null);
    setUploadedImageUrl("");
    setCurrentEditedId(null);
    setOpenCreateProducts(false);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Extract products array from the productList object
  const products = productList?.data || [];

  return (
    <AdminLayout>
      <Fragment>
        <div className="mb-5 flex justify-end">
          <Button
            onClick={() => setOpenCreateProducts(true)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add New Product"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 text-red-500">
            {error.message || "Failed to load products"}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((productItem) => (
              <AdminProductTile
                setOpenCreateProducts={setOpenCreateProducts}
                key={productItem._id}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setFormData={setFormData}
                setUploadedImageUrl={setUploadedImageUrl}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p>{loading ? "Loading products..." : "No products found."}</p>
          )}
        </div>

        <Sheet
          open={openCreateProducts}
          onOpenChange={(open) => {
            if (!open) {
              resetForm();
            }
            setOpenCreateProducts(open);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>

            <ProductImage
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoading={setImageLoading}
              imageLoading={imageLoading}
              currentEditedId={currentEditedId}
              isEditMode={!!currentEditedId}
            />

            <div className="py-6 px-3">
              <Form
                formData={formData}
                setFormData={handleFormDataChange}
                formControls={addProductFormElements}
                buttonText={currentEditedId ? "Update Product" : "Add Product"}
                onSubmit={handleSubmit}
                disabled={imageLoading}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </Fragment>
    </AdminLayout>
  );
}
