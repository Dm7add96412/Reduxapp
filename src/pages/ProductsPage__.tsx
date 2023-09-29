// import React, { useEffect } from 'react'

// import { addProduct, fetchAllProductsAsync, removeProduct,  } from '../redux/reducers/productsReducer'
// import useAppSelector from '../hook/useAppSelector'
// import useAppDispatch from '../hook/useAppDispatch'


// const ProductsPage = () => {
//     // const {products, loading, error } = useAppSelector(state => state.productsReducer)
//     const users = useAppSelector(state => state.userReducer)
//     const dispatch = useAppDispatch()

//     useEffect(() => {
//     dispatch(fetchAllProductsAsync({offset: 0, limit: 20}))
//     }, [])

//     const onAddNew = () => {
//         dispatch(addProduct({
//             id: 'asdfasd',
//             price: 50,
//             title: 'shirt',
//             description: 't-shirt',
//             images: ['www.kuva.fi', 'www.kuva2.fi']
//         }))
//     }
//     // console.log('product list', products)

//     const onRemoveProduct = () => {
//         dispatch(removeProduct('sdfsdf'))
//     }

//   return (
//     <div>
//         <button onClick={onRemoveProduct}>Remove Product</button>
//         <button onClick={onAddNew}>Add new product</button>
//         {users.map(u => 
//             <p>{u.name} {u.email}</p>)}
//     </div>
//   )
// }
 
// export default ProductsPage