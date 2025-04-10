import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cartSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const [isMaxStockReached, setIsMaxStockReached] = useState(false);

  // Check stock availability when component mounts or cartItem changes
  useEffect(() => {
    if (cartItem && productList.length) {
      const product = productList.find((p) => p._id === cartItem.productId);
      if (product) {
        setIsMaxStockReached(cartItem.quantity >= product.totalStock);
      }
    }
  }, [cartItem, productList]);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (!getCartItem) return;

    const newQuantity =
      typeOfAction === "plus"
        ? getCartItem.quantity + 1
        : getCartItem.quantity - 1;

    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    // Check stock availability
    const product = productList.find((p) => p._id === getCartItem.productId);
    if (
      product &&
      typeOfAction === "plus" &&
      newQuantity > product.totalStock
    ) {
      toast.error("You have reached the maximum stock limit");
      return;
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(`Quantity updated to ${newQuantity}`);
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    if (!getCartItem) return;

    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item removed from cart");
      }
    });
  }

  // Calculate price safely
  const calculatePrice = () => {
    const price =
      cartItem?.salePrice > 0 ? cartItem.salePrice : cartItem?.price;
    const quantity = cartItem?.quantity || 0;
    return (price * quantity).toFixed(2);
  };

  return (
    <motion.div
      className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg transition-all hover:shadow-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={cartItem?.image || "/placeholder-product.jpg"}
          alt={cartItem?.title || "Product image"}
          className="w-full h-full rounded-md object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-product.jpg";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-gray-900 truncate">
          {cartItem?.title || "Unknown Product"}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            size="icon"
            disabled={cartItem?.quantity <= 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </Button>

          <span className="font-semibold text-gray-900 text-lg min-w-[24px] text-center">
            {cartItem?.quantity || 0}
          </span>

          <Button
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            size="icon"
            disabled={isMaxStockReached}
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Price & Delete Button */}
      <div className="flex flex-col items-end ml-4">
        <p className="font-semibold text-gray-900 text-lg">
          ${calculatePrice()}
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 text-red-500 hover:text-red-700 focus:outline-none"
          onClick={() => handleCartItemDelete(cartItem)}
          aria-label="Remove item from cart"
        >
          <Trash size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;
