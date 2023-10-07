import CreateProduct from "./CreateProduct";

interface UpdateProduct {
    input: Partial<CreateProduct>
    id: number
}

export default UpdateProduct