import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "@/config";

export const fetchReviews = createAsyncThunk(
    'products/fetchReviews', async(productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseUrl}/reviews/${productId}`)
            return response.data
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addReview = createAsyncThunk(
    //la calificación rating 
    'products/addReviews', async({rating, comment, productId, userId}) => {
        try {
            const response = await axios.post(`${baseUrl}/reviews`, {
                rating, comment, productId, userId
            })
            return response.data
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
);

// Reducer slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = [...state.reviews, { ...action.payload }];
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default reviewsSlice.reducer;
