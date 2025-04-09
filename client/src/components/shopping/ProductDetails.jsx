import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/productSlice";
import { addToCart, getCartItems } from "@/store/shop/cartSlice";
import { toast } from "sonner";

export default function ProductDetails({ open, setOpen, productDetails }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails(null));
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCart = cartItems?.items || [];

    if (getCart.length) {
      const index = getCart.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (index > -1) {
        const currentQuantity = getCart[index].quantity;
        if (currentQuantity + 1 > getTotalStock) {
          toast.error(
            `Only ${currentQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          {/* Consider using next/image for better performance */}
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent />
            </div>
            <span className="text-muted-foreground">{/* Rating value */}</span>
          </div>

          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator className="border border-green-600 border-dashed opacity-80 transition-opacity duration-300 hover:opacity-100 my-5" />

          {/* Optional: Uncomment when reviews are ready */}
          {/*
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews?.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback className="bg-primary text-white font-extrabold">
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
          </div>
          */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
