import {rest} from 'msw'
import {setupServer} from 'msw/node'
import productsData from '../data/productsData'

export const handlers = [
    // rest.get('/api/user', (req, res, ctx) => {
    //     return res(ctx.json(''), ctx.delay(150))
    // })
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
    rest.get('https://api.escuelajs.co/api/v1/products/', async (req, res, ctx) => {
        const productsLength = productsData
        return res(
            ctx.json(productsLength)
        )
    }),
    rest.post('https://api.escuelajs.co/api/v1/products/', async (req, res, ctx) => {
        const data = req.bodyUsed
    })
]

const server = setupServer(...handlers)

export default server