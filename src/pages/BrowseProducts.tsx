import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchPProductsLength, fetchAllProductsPagination } from '../redux/reducers/productsReducer'

const BrowseProducts = () => {
    const {products , loading, error, productsLength } = useAppSelector(state => state.productsReducer)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const limit = 50

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchPProductsLength())
    },[])

    useEffect(() => {
        const offset = (currentPage - 1) * limit
        dispatch(fetchAllProductsPagination({offset, limit}))
        }, [currentPage])

    const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

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
        {!loading &&
        <Grid container spacing={2}
                padding={2}
                justifyContent="center"
                alignItems="center">
                <Pagination count={productsLength && Math.ceil(productsLength / limit)} 
                color='standard'
                onChange={handlePageClick}
                page={currentPage}/>
        </Grid>}
        <Grid container spacing={2}
                padding={2}
                justifyContent="center"
                alignItems="center">
            <Grid xs={3}></Grid>
            <Grid xs={6} >
            {!loading && products.map(p => 
                <Grid container spacing={1} 
                    padding={1}
                    key={p.id}
                    border={1}
                    borderRadius={8}
                    alignItems="center"
                    justifyContent="space-evenly">
                        
                        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'start' }}>
                            <img src={p.images[0] ? p.images[0] : p.category?.image} alt={p.title} width="150" height="150"/>
                        </Grid>
                        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
                            {p.title}
                        </Grid>
                        <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
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
            </Grid>  
            <Grid xs={3}></Grid>      
        </Grid>
    </Box>
  )
}

export default BrowseProducts