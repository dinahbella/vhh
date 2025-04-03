import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:7000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/getallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:7000/api/admin/products/get"
    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async (id, formData) => {
    const result = await axios.put(
      `http://localhost:7000/api/admin/products/edit/${id}`,
      id,
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:7000/api/admin/products/delete/${id}`,
      id
    );
    return result?.data;
  }
);
const AdminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productsList = [];
      });
  },
});

export default AdminProductSlice.reducer;
