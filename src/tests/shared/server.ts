import {rest} from 'msw'
import {setupServer} from 'msw/node'
import productsData from '../data/productsData'
import Product from '../../types/Product'
import CreateProduct from '../../types/CreateProduct'

export const handlers = [

    rest.delete('https://api.escuelajs.co/api/v1/products/:id', async (req, res, ctx) => {
        const {id} = req.params
        if (productsData.find(p => p.id === Number(id))) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }

    }),
    rest.get('https://api.escuelajs.co/api/v1/products', async (req, res, ctx) => {
        const products: Product[] = productsData
        return res(
            ctx.json(products)
        )
    }),
    rest.get('https://api.escuelajs.co/api/v1/products', async (req, res, ctx) => {
        console.log('does it go here?')
        const url = new URL(req.url)
        const offset = Number(url.searchParams.get('offset'))
        const limit = Number(url.searchParams.get('limit'))
        console.log('offset:', offset, 'limit', limit)

        const paginatedProducts: Product[] = productsData.slice(offset, offset + limit)
        return res(
            ctx.json(paginatedProducts)
        )
    }),
    rest.post('https://api.escuelajs.co/api/v1/products', async (req, res, ctx) => {
        const inputData: CreateProduct = await req.json()
        const product = productsData.find(p => p.category?.id === inputData.categoryId)

        if (product !== undefined) {
            const newProduct: Product = {
                id: productsData[2].id + 1,
                images: inputData.images,
                title: inputData.title,
                price: inputData.price,
                description: inputData.description,
                category: product.category
            }

            return res(
                ctx.json(newProduct)
            )  
        } else {
            ctx.status(400)
            return res(ctx.json({
                message: ["price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array"],
                error: "Bad Request",
                statusCode: 400
            }))
        }
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        const input = await req.json()
        const {id} = req.params

        const foundIndex = productsData.findIndex(p => p.id === Number(id))
        if(foundIndex > -1) {
            return res(ctx.json({
                ...productsData[foundIndex],
                ...input
            }))
        } else {
            ctx.status(400)
            return res(ctx.json({
                message: ["price must be a positive number",
                "images must contain at least 1 elements",
                "each value in images must be a URL address",
                "images must be an array"],
                error: "Bad Request",
                statusCode: 400
            }))
        }
    })
]

const server = setupServer(...handlers)

export default server