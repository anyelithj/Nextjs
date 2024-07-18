import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "@/config";//import { baseUrl } from '../config'

//crear acción thunk para recuperar la categoria de búsqueda 
//thunk action to fetch category 
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories', async (_, { rejectWithValue }) =>{
        try {
            const response = await axios.get(`${baseUrl}/categories`)
            return response
        } catch(error) {
            return rejectWithValue(error.message)
        }
})

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        loading: false,
        categories: [],
        error: null,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action)=> {
            state.loading = false;
            state.categories = action.payload;
            state.error = null
        })//la llamamos aquí la busqueda de la categoría
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(addCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(addCase.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload);
            state.error = null;
        })
        .addCase(addCategory.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })
       .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
       })
       .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(category => category._id !== action.payload)
        state.error = null;
       })
       .addCase(deleteCategory.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
       })
       .addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            const updatedIndex = state.categories.findIndex(category => category._id === action.payload)
            if(updatedIndex !== -1) {
                state.categories[updatedIndex] = action.payload;
            }
            state.error = null;
       })
       .addCase(updateCategory.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload
       })
    }
})

export default categorySlice.reducer