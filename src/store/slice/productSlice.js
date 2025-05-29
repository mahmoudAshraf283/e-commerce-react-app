import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;


        const categories = action.payload.map((product) => product.category);
        state.categories = [...new Set(categories)];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
