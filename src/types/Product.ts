export default interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[],
    category?: {
        id: number,
        name: string,
        image: string
    }
}