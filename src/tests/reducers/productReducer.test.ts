import { createStore } from "../../redux/store";
import productReducer, { fetchSingleProduct } from "../../redux/reducers/productReducer";
import productsData from '../data/productsData';
import server from "../shared/server";

let store = createStore()

beforeEach(() => {
    store = createStore()
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Fetch single product with correct ID", async () => {
    const resultAction = await store.dispatch(fetchSingleProduct('726'))
    const product = {
        id: 726,
        title: "Computer (3 pictures)",
        price: 5000,
        description: "A very powerful computer with 3 pictures",
        images: [
        "https://i.imgur.com/r7CYJWI.jpeg",
        "https://i.imgur.com/4XE4KwK.jpeg",
        "https://i.imgur.com/PK1WFTJ.jpeg"
        ],
        category: {
        id: 1,
        name: "Electronics",
        image: "https://i.imgur.com/F1XLwX4.jpeg",
        }
        }
    expect(resultAction.payload).toMatchObject(product)
})
test("DO NOT fetch a single product with incorrect ID", async () => {
    const resultAction = await store.dispatch(fetchSingleProduct('72634'))

    expect(resultAction.payload).toBeInstanceOf(Error)
})