import React, { useEffect } from 'react'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchAllProductsAsync } from '../redux/reducers/productsReducer'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'

const BrowseProducts = () => {
    const {products , loading, error } = useAppSelector(state => state.productsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllProductsAsync({offset: 0, limit: 100}))
        }, [])

  return (
    <Box display='flex'
    flexDirection='column'
    alignItems='space-around'>
        <Grid container spacing={2} 
                padding={1}
                justifyContent="center">
            {loading ? <CircularProgress/> : 
            null}
        </Grid>
        {!loading && products.map(p => 
            <Grid container spacing={2} 
                padding={1}>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        IMAGE
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {p.title}
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {p.price}€
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        ADD TO CART
                    </Grid>
            </Grid>)}
    </Box>
  )
}

export default BrowseProducts