import axios, { AxiosError } from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CategoriesReducerState from "../../types/CategoriesReducerState";
import Categories from "../../types/Categories";

export const initialState: CategoriesReducerState = {
    categories: [],
    loading: false,
}

export const fetchAllCategories = createAsyncThunk(
    'fetchAllCategories',
    async() => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories`)
            const data: Categories[] = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Error fetching all products length:', error.response?.status, error.message)
            return error
        }
    }
)

const categoriesSlice = createSlice(
    {
    name: 'categoriesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // FETCH ALL CATEGORIES
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            if(!(action.payload instanceof AxiosError)) {
                return {
                    ...state,
                    loading: false,
                    categories: action.payload
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            }
        })
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        })
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            if (action.payload instanceof AxiosError) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            }
        })
    } 
    }
)

const categoriesReducer = categoriesSlice.reducer

export default categoriesReducer