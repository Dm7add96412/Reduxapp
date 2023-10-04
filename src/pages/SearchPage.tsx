import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { findProducts } from '../redux/reducers/productsReducer'
import ProductsRender from '../components/ProductsRender'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const searchWord = params.searchWord
  const { foundProducts, loading, error } = useAppSelector(state => state.productsReducer)

  useEffect(() => {
    if(searchWord) {
      dispatch(findProducts(searchWord))
    } else {
      console.log('no search word found')
    }
  }, [searchWord])

  return (
    <Box display='flex'
    flexDirection='column'
    alignItems='space-around'>
        <Grid container spacing={2} 
                padding={1}
                justifyContent="center">
            {error || ((foundProducts && foundProducts?.length < 1) && !loading) ? <Alert severity="error"> Error finding products with searchword: {searchWord}! </Alert> : null}
            {!error && loading ? <CircularProgress/> : null}
            {!error && !loading && (foundProducts && foundProducts?.length > 0) && <Alert severity="info"> Found {foundProducts?.length} results with searchword: {searchWord} </Alert>}
        </Grid>
        {foundProducts && <ProductsRender selectedProducts={foundProducts} />}
    </Box>
  )
}

export default SearchPage