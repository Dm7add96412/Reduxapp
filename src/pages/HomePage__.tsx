// import React, { useState } from 'react'

// import { addUser, removeUser } from '../redux/reducers/userReducers'
// import useAppSelector from '../hook/useAppSelector'
// import { sortByPrice } from '../redux/reducers/productsReducer'
// import useAppDispatch from '../hook/useAppDispatch'
// import getFiltered from '../redux/selectors/getFiltered'
// import { addToCart } from '../redux/reducers/cartReducer'
// import Product from '../types/Product'

// const HomePage = () => {
//   const {products , loading, error } = useAppSelector(state => state.productsReducer)
//   const [search, setSearch] = useState<string | undefined>( )
//   const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search?.toLowerCase()||''))
//   const dispatch = useAppDispatch()
//   const filteredProducts = useAppSelector((state) => getFiltered(state, search))
//   const cart = useAppSelector(state => state.cartReducer)

//   const onSortAsc = () => {
//     dispatch(sortByPrice('asc'))
//   }
//   const OnSortDesc = () => {
//     dispatch(sortByPrice('desc'))
//   }

//   const onAddNewUser = () => {
//     dispatch(addUser({
//       name: 'Juha',
//       email: 'juha@juha.juha',
//       id: 1,
//       password: '123123'
//     }))
//   }

//   const onRemoveUser = () => {
//     dispatch(removeUser(1))
//   }

//   const onAddToCart = (payload: Product) => {
//     dispatch(addToCart(payload))
// }

//   return (
//     <div>
//       <p>Number of items in cart:</p>
//       {cart && cart.map(item => (
//         <div key={item.id}>
//             <p>{item.title}: {item.quantity}</p>
//         </div>
//       ))}
//       {loading ? <p>Page loading</p> : null}
//       {/* THIS DOESN'T WORK YET??? {error ? <p>There has been an error: {error}</p> : null} */}
//       <input type="text" placeholder='Search products by title' value={search}
//         onChange={(e) => setSearch(e.target.value)} />
//       {filteredProducts.map(p => 
//         <div key={p.id}>{p.title} {p.price}
//         <button onClick={() => onAddToCart(p)}>Add To Cart</button></div>)}
//       <button onClick={onAddNewUser}>Add new user</button>
//       <button onClick={onRemoveUser}>Remove User</button>
//       <button onClick={onSortAsc}>Sort ASC</button>
//       <button onClick={OnSortDesc}>Sort DESC</button>
//     </div>
//   )
// }

// export default HomePage