import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";
import ProducstReducerState from "../../types/ProductsReducerState";

export const initialState: ProducstReducerState = {
    products: [],
    filteredProducts: undefined,
    loading: false,
    page: 1
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
            return error
        }
    }
)

export const fetchFilterProducts = createAsyncThunk(
    'fetchFilterProducts',
    async(categoryId: number) => {
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
            const data: Product[] = response.data
            return data
        } catch(e) {
            const error = e as AxiosError
            console.log('Error with filtering by category', error.response?.status, error.message)
            return error
        } 
    }
)

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async(productId: number) => {
        try {
            const result = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/products/${productId}`)
            if(!result.data) {
                throw new Error('Cannot delete!')
            }
            return productId
        } catch(e) {
            const error = e as AxiosError
            console.log('Error with deleting a product', error.response?.status, error.message)
            return { error: 'Cannot delete!' }
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
        },
        clearFiltering: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.filteredProducts = undefined
            } else {
                console.log('error with clearing filter')
            }       
        },
        sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            if(action.payload === 'asc') {
                state.products.sort((a, b) => a.price - b.price)
            } else {
                state.products.sort((a, b) => b.price - a.price)
            }
        }
    },
        // async functions here, with all the three steps
        extraReducers: (builder) => {
            // FETCH ALL PRODUCTS PAGINATION
            builder.addCase(fetchAllProductsPagination.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        products: action.payload,
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
            // FILTER PRODUCTS
            builder.addCase(fetchFilterProducts.fulfilled, (state, action) => {
                if(!(action.payload instanceof AxiosError)) {
                    return {
                        ...state,
                        loading: false,
                        filteredProducts: action.payload
                    }
                } else {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            builder.addCase(fetchFilterProducts.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(fetchFilterProducts.rejected, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            // DELETE A PRODUCT
            builder.addCase(deleteProduct.fulfilled, (state, action) => {
                if(typeof action.payload === "number") {
                    state.products = state.products.filter(p => p.id !== action.payload)
                } else if (action.payload instanceof AxiosError){
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    }
                }
            })
            builder.addCase(deleteProduct.pending, (state, action) => {
                return {
                    ...state,
                    loading: true
                }
            })
            builder.addCase(deleteProduct.rejected, (state, action) => {
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

export const { preservePagination, clearFiltering, sortByPrice} = productsSlice.actions
export default productsReducer