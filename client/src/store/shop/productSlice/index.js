import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getFilteredProducts = createAsyncThunk(
  "/products/getAllProducts",
  async ({ filterParams, sortParams }) => {
    // async () => {
    console.log(getFilteredProducts, "getFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    // const result = await axios.get(
    //   `http://localhost:7000/api/shop/products/get`
    // );

    const result = await axios.get(
      `http://localhost:7000/api/shop/products/get?${query}`
    );

    console.log(result);

    return result?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/getProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;
