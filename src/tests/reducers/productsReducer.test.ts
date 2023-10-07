import { AxiosError } from "axios";
import productsReducer, { clearFiltering, createProduct, deleteProduct, fetchAllProductsPagination, fetchProductsLength, preservePagination, sortByPrice, updateProduct } from "../../redux/reducers/productsReducer"
import { createStore } from "../../redux/store";
import ProducstReducerState from "../../types/ProductsReducerState";
import productsData from '../data/productsData';
import server from "../shared/server";
import PaginationQuery from "../../types/PaginationQuery";
import CreateProduct from "../../types/CreateProduct";
import UpdateProduct from "../../types/UpdateProduct";

let store = createStore()

beforeEach(() => {
    store = createStore()
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


 
describe("Test async actions", () => {
    test("Should fetch all products", async () => {
         const resultAction = await store.dispatch(fetchProductsLength())

         expect(resultAction.payload).toBe(3)
    })
//     test("Should fetch products with pagination", async () => {
//         const paginationQuery: PaginationQuery = { offset: 1, limit: 1}
//         const resultAction = await store.dispatch(fetchAllProductsPagination(paginationQuery))

//    })
    test("Should delete a product", async () => {
        const resultAction = await store.dispatch(deleteProduct(726))
        expect(resultAction.payload).toBe(726)
    })
    test("Should not delete a non-existing product", async () => {
        const resultAction = await store.dispatch(deleteProduct(1))
        expect(resultAction.payload).toBeInstanceOf(Error)
    })
    test("Should create a product", async () => {
        const input: CreateProduct = {
            title: "test product",
            description: "testing",
            price: 100,
            categoryId: 1,
            images: ['image', 'image2']
        }
        await store.dispatch(createProduct(input))
        expect(store.getState().productsReducer.products.length).toBe(1)
    })
    test("Should not create a product with a wrond id", async () => {
        const inputData: CreateProduct = {
            title: "test product",
            description: "testing",
            price: 100,
            categoryId: 9,
            images: ['image', 'image2']
        }
        await store.dispatch(createProduct(inputData))
        expect(store.getState().productsReducer.products.length).toBe(1)
    })
    test("Should update a product with correct ID", async () => {
        const input: UpdateProduct = {
            id: 1,
            input: {
                price: 340,
                title: "Updated title"
            }
        }
        await store.dispatch(updateProduct(input))
        expect()
    })

})

describe("Test non-async actions", () => {
    test("Should sort products by price ASC", () => {
        // store.dispatch(setUpState(productsData))
        // store.dispatch(sortByPrice('asc'))
        // const products = store.getState().productsReducer.products
        const state: ProducstReducerState = {
            loading: false,
            page: 1,
            products: productsData
        }
         const products = productsReducer(state, sortByPrice('asc')).products

        expect(products[0]).toBe(productsData[1])
        expect(products[1]).toBe(productsData[2])
    })
    test("Should sort products by price DESC", () => {
        const state: ProducstReducerState = {
            loading: false,
            page: 1,
            products: productsData
        }
         const products = productsReducer(state, sortByPrice('desc')).products
        
        expect(products[0]).toBe(productsData[0])
        expect(products[1]).toBe(productsData[2])
    })
    test("Should preserve global page", () => {
        const state: ProducstReducerState = {
            loading: false,
            page: 2,
            products: [],
        }
        const page = productsReducer(state, preservePagination(3)).page

        expect(page).toBe(3)
    })
    test("Should clear filtering/filteredProducts = undefined", () => {
        const state: ProducstReducerState = {
            loading: false,
            page: 1,
            products: [],
            filteredProducts: productsData
        }

        const filteredProducts = productsReducer(state, clearFiltering(true)).filteredProducts

        expect(filteredProducts).toBe(undefined)
    })

})