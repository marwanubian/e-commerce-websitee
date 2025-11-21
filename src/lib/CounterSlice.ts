import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CounterState {
  counter: number;
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  counter: 0,
  brands: [],
  isLoading: false,
  error: null,
};

// ✅ Async thunk to fetch brands
export const getBrands = createAsyncThunk("counter/getBrands", async () => {
  const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return res.data.data as Brand[]; // API returns { data: Brand[] }
});

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    incrementByValue: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch brands";
      });
  },
});

export const { increment, decrement, incrementByValue } = CounterSlice.actions;
export default CounterSlice.reducer;
