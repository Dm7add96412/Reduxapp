import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";

const initialState: {
    products: Product[],
    error?: string,
    loading: boolean,
    productsLength?: number,
    product?: Product,
    page?: number
} = {
    products: [],
    loading: false,
}

export const fetchAllProductsPagination = createAsyncThunk(
    'fetchAllProductsAsync',
    async({limit, offset}: PaginationQuery) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const data: Product[] = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Axios error, fetch all products:', error.response?.status, error.message)
            return error
        }
    }
)

export const fetchPProductsLength = createAsyncThunk(
    'fetchProductsLength',
    async() => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products`)
            const data: Product[] = response.data
            return data.length
        } catch(e) {
            const error = e as AxiosError
            console.log('Axios error, fetch all products:', error.response?.status, error.message)
            return error
        }
    }
)

export const fetchSingleProduct = createAsyncThunk(
    'fetchSingleProduct',
    async(productId: string) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
            const data: Product = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Axios error, fetch all products:', error.response?.status, error.message)
            return error
        }
    }
)

const productsSlice = createSlice(
    {
    name: 'productsSlice',
    initialState,
    reducers: {
        preservePagination: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        }
        // addProduct: (state, action: PayloadAction<Product>) => {
        //     state.products.push(action.payload)
        // },
        // removeProduct: (state, action: PayloadAction<string>) => {
        //     // console.log(action.payload)
        //     const foundProduct = state.products.findIndex(p => p.id === action.payload)
        //     foundProduct >= 0 ? state.products.splice(foundProduct, 1) : console.log('could not remove product index:', foundProduct)
        // },
        // sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
        //     if(action.payload === 'asc') {
        //         state.products.sort((a, b) => a.price - b.price)
        //     } else {
        //         state.products.sort((a, b) => b.price - a.price)
        //     }
        // }
    },
        // async functions here, with all the three steps
        extraReducers: (builder) => {
            // FETCH ALL PRODUCTS PAGINATION
            builder.addCase(fetchAllProductsPagination.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        products: action.payload,
                        filteredProducts: action.payload,
                        loading: false
                    }
                }
            })
            builder.addCase(fetchAllProductsPagination.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchAllProductsPagination.rejected, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return {
                        ...state,
                        loading: false,
                        error: action.error.message
                    }
                }
            })
            // FETCH PRODUCTS LENGTH
            builder.addCase(fetchPProductsLength.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        productsLength: action.payload,
                        loading: false
                    }
                }
            })
            builder.addCase(fetchPProductsLength.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchPProductsLength.rejected, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return {
                        ...state,
                        loading: false,
                        error: action.error.message
                    }
                }
            })
            // FETCH SINGLE PRODUCT
            builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        product: action.payload,
                        loading: false
                    }
                }
            })
            builder.addCase(fetchSingleProduct.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchSingleProduct.rejected, (state, action) => {
                if(action.payload instanceof AxiosError) {
                    return {
                        ...state,
                        error: action.error.message,
                        loading: false
                    }
                }
            })
        }
    }
) //createSlice returns {actions, reducer, ...}

const productsReducer = productsSlice.reducer // contains current value of property 'productReducer' in global state

export const { preservePagination } = productsSlice.actions
export default productsReducer