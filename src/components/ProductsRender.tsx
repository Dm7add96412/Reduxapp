import React from 'react'
import Product from '../types/Product'
import Grid from '@mui/material/Unstable_Grid2'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'

import useAppSelector from '../hook/useAppSelector'
import PaginationRender from './PaginationRender'

interface ProductsRenderProps {
    selectedProducts: Product[];
  }

const ProductsRender: React.FC<ProductsRenderProps> = ({selectedProducts}) => {
    const {loading, error, products } = useAppSelector(state => state.productsReducer)
    const navigate = useNavigate()
  return (
    <Grid container spacing={2}
    padding={2}
    justifyContent="center"
    alignItems="center">
        <Grid xs={3}></Grid>
        <Grid xs={6} rowGap={6}>
            <Grid container spacing={2} 
                padding={1}
                justifyContent="center">
                {selectedProducts.length < 1 && !loading? <Alert severity="warning"> There were no products to be found! </Alert> : null}
            </Grid>
        {selectedProducts === products ? <PaginationRender/> : null}
        {!error && !loading && selectedProducts.map(p => 
            <Grid container spacing={-2} 
                padding={4}
                key={p.id}
                border={1}
                borderRadius={4}
                alignItems="center"
                justifyContent="space-evenly">
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'start' }}>
                        {p.images[0] ? <img src={p.images[0]} alt={p.title} width="150" height="150"/> : 'no image'}
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'start', alignSelf: 'center' }}>
                        {p.title}
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'start', alignSelf: 'center' }}>
                        {p.price}€
                    </Grid>
                    <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignSelf: 'center'}}>
                        <Button
                        size='small'
                        variant='outlined'
                        onClick={() => navigate(`/singleproduct/${p.id}`)}>
                            DETAILS
                        </Button>
                        <Button
                        size='small'
                        variant='contained'>
                            Add to Cart
                        </Button>
                    </Grid>     
                </Grid>)}
            {selectedProducts === products  ? <PaginationRender/> : null}
            </Grid>  
            <Grid xs={3}></Grid>    
    </Grid>
  )
}

export default ProductsRender