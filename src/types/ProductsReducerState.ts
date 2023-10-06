import { AxiosError } from "axios";
import Product from "../types/Product";
import Categories from "./Categories";

export default interface ProducstReducerState {
    products: Product[],
    error?: AxiosError,
    loading: boolean,
    productsLength?: number,
    page: number
    foundProducts?: Product[],
    filteredProducts?: Product[] | undefined
}