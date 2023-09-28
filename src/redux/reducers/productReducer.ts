import axios, { AxiosError } from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Product from "../../types/Product";

const initialState: {
    product: Product,
    error?: string,
    loading: boolean
} = {
    product: {
        id: '',
        title: '',
        price: 0,
        images: [],
        description: ''
    },
    loading: false
}

export const fetchSingleProductAsync = createAsyncThunk(
    'fetchSingleProductAsync',
    async(id: string) => {
        try{
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
            const data: Product = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Axios error, fetch single product:', error.response?.status, error.message)
            return error
        }
    }
)

const productSlice = createSlice(
    {
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
            if(!(action.payload instanceof AxiosError)) {
                return {
                    ...state,
                    product: action.payload,
                    loading: false
                }
            }
        })
        builder.addCase(fetchSingleProductAsync.pending, (state, action) => {
            return {
                ...state,
                loading: false
            }
        })
        builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
            if((action.payload instanceof AxiosError)) {
                return {
                    ...state,
                    error: action.error.message,
                    loading: false
                }
            }
        })
    }
    }
)

const productReducer = productSlice.reducer

export default productReducer