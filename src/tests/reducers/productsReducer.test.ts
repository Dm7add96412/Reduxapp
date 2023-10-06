import { AxiosError } from "axios";
import productsReducer, { clearFiltering, deleteProduct, fetchAllProductsPagination, fetchProductsLength, preservePagination, sortByPrice } from "../../redux/reducers/productsReducer"
import { createStore } from "../../redux/store";
import ProducstReducerState from "../../types/ProductsReducerState";
import productsData from '../data/productsData';
import server from "../shared/server";

let store = createStore()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(() => {
    store = createStore()
})

describe("Test async actions", () => {
    // test("Should fetch all products with pagination", async () => {
    //      const productsLength = await store.dispatch(fetchProductsLength())
    //      console.log(productsLength)
    // })
    test("Should delete a product", async () => {
        const resultAction = await store.dispatch(deleteProduct(726))
        expect(resultAction.payload).toBe(726)
    })
    test("Should not delete a non-existing product", async () => {
        const resultAction = await store.dispatch(deleteProduct(1))
        // expect(resultAction.payload).toBeInstanceOf(Error)
        expect(resultAction.payload).toStrictEqual({error: "Cannot delete!"})
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