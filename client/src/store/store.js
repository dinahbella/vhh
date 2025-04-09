import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/productSlice";
import shopProductSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";
import addressSlice from "./shop/addressSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    address: addressSlice,
  },
});

export default store;
