import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchSingleProduct } from '../redux/reducers/productReducer'


const SingleProduct = () => {
    const params = useParams()
    const productId = params.productId
    const {loading, error, product } = useAppSelector(state => state.productReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(productId) {
            dispatch(fetchSingleProduct(productId))
        }   else {
            console.log(error)
        }
    },[])

  return (
    <Box display='flex'
    flexDirection='column'
    alignItems='center'>
            {error ? <Alert severity="error"> Error fetching product! </Alert> : null}
            {!error && loading ? <CircularProgress/> : 
            null}
            {!error && product ? <div>{product.title} <br />
            {product.description}</div> : null}
    </Box>
  )
}

export default SingleProduct