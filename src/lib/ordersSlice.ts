import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface OrdersState {
  orders: any[] | null;
  order: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: null,
  order: null,
  isLoading: false,
  error: null,
};

// ✅ Get all orders for a user
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      return res.data; // array of orders
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// ✅ Get order by ID
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/${orderId}`
      );
      return res.data; // single order
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // all orders
    builder.addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // single order
    builder.addCase(getOrderById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default ordersSlice.reducer;
