import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";

const initialState: {
    products: Product[],
    error?: AxiosError,
    loading: boolean,
    productsLength?: number,
    page?: number
    foundProducts?: Product[]
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
            console.log('Error fetching all products pagination:', error.response?.status, error.message)
            return error
        }
    }
)

export const fetchProductsLength = createAsyncThunk(
    'fetchProductsLength',
    async() => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products`)
            const data: Product[] = response.data
            return data.length
        } catch(e) {
            const error = e as AxiosError
            console.log('Error fetching all products length:', error.response?.status, error.message)
            return error
        }
    }
)

export const findProducts = createAsyncThunk(
    'findProducts',
    async(title: string) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?title=${title}`)
            const data: Product[] = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Error with find products: ', error.response?.status, error.message)
        }
    }
)

export const filterByCategory = createAsyncThunk(
    'filterByCategory',
    async(category: string) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${category}`)
            const data: Product[] = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Error with filtering by category', error.response?.status, error.message)
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
                } else {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
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
                        error: action.payload
                    }
                }
            })
            // FETCH PRODUCTS LENGTH
            builder.addCase(fetchProductsLength.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        productsLength: action.payload,
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
            builder.addCase(fetchProductsLength.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchProductsLength.rejected, (state, action) => {
                if (action.payload instanceof AxiosError) {  
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            // FIND PRODUCTS
            builder.addCase(findProducts.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        loading: false,
                        foundProducts: action.payload
                    }
                } else {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            builder.addCase(findProducts.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(findProducts.rejected, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            // FILTER BY CATEGORY
            builder.addCase(filterByCategory.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        loading: false,
                        foundProducts: action.payload
                    }
                } else {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            builder.addCase(filterByCategory.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(filterByCategory.rejected, (state, action) => {
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
) //createSlice returns {actions, reducer, ...}

const productsReducer = productsSlice.reducer // contains current value of property 'productReducer' in global state

export const { preservePagination } = productsSlice.actions
export default productsReducer