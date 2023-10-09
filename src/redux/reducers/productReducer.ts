import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Product from "../../types/Product";

const initialState: {
    product: Product,
    error?: AxiosError,
    loading: boolean
} = {
    product: {
        id: 0,
        title: '',
        price: 0,
        images: [],
        description: ''
    },
    loading: false
}

export const fetchSingleProduct = createAsyncThunk(
    'fetchSingleProductAsync',
    async(id: string) => {
        try{
            const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
            const data = response.data
            const product: Product = {
                id: data.id,
                description: data.description,
                title: data.title,
                price: data.price,
                images: data.images
            }
            if(product.id) {
                return data
            } else {
                throw new Error('Cannot fetch single product data')
            }  
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
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            if(!(action.payload instanceof AxiosError)) {
                return {
                    ...state,
                    product: action.payload,
                    loading: false
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            } 
        })
        builder.addCase(fetchSingleProduct.pending, (state, action) => {
            return {
                ...state,
                loading: false
            }
        })
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            if((action.payload instanceof AxiosError)) {
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            }
        })
    }
    }
)

const productReducer = productSlice.reducer

export default productReducer