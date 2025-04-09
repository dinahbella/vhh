import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cartSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error("You have reached the maximum stock limit");
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(`Quantity updated to ${getCartItem?.quantity}`);
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <motion.div
      className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg transition-all hover:shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Product Image */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-900">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          {/* Decrease Quantity Button */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </Button>

          {/* Quantity Count */}
          <span className="font-semibold text-gray-900 text-lg">
            {cartItem?.quantity}
          </span>

          {/* Increase Quantity Button */}
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Price & Delete Button */}
      <div className="flex flex-col items-end">
        <p className="font-semibold text-gray-900 text-lg">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>

        {/* Delete Button with Animation */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="mt-2 cursor-pointer text-red-500 transition-all hover:text-red-700"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;
