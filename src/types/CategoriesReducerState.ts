import { AxiosError } from "axios";
import Categories from "./Categories";

export default interface CategoriesReducerState {
    error?: AxiosError,
    loading: boolean,
    categories: Categories[]
}