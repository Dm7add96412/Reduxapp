import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchProductsLength, fetchAllProductsPagination } from '../redux/reducers/productsReducer'
import Filters from '../components/Filters'
import ProductsRender from '../components/ProductsRender'

const BrowseProducts = () => {
    const {products , loading, error, page, filteredProducts } = useAppSelector(state => state.productsReducer)
    const limit = 50
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProductsLength())
    },[])

    useEffect(() => {
        const offset = (page - 1) * limit
        dispatch(fetchAllProductsPagination({offset, limit}))
        }, [page])


  return (
    <Box display='flex'
    flexDirection='column'
    alignItems='space-around'>
        <Filters/>
        <Grid container spacing={2} 
                padding={1}
                justifyContent="center">
            
            {error ? <Alert severity="error"> Error fetching products! </Alert> : null}
            {!error && loading ? <CircularProgress/> : null}
        </Grid>
        {filteredProducts === undefined ? <ProductsRender selectedProducts={products}/> 
        : <ProductsRender selectedProducts={filteredProducts}/>}
    </Box>
  )
}

export default BrowseProducts