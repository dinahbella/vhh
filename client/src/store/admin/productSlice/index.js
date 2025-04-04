import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: { success: true, message: "", data: [] },
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:7000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/getAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:7000/api/admin/products/get"
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:7000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:7000/api/admin/products/delete/${id}`,
      id
    );
    return result?.data;
  }
);
const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
