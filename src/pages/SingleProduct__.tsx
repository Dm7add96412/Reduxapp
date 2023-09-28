import React, { useEffect } from 'react'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchSingleProductAsync } from '../redux/reducers/productReducer'

const SingleProduct = () => {
    const {product, loading, error} = useAppSelector(state => state.productReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSingleProductAsync('227'))
    }, [])
  return (
    <div>
        {product && <p>Here's a single product: {product.title}, Price: {product.price}</p>}
    </div>
  )
}

export default SingleProduct