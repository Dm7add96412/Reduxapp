import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import axios, { AxiosError } from 'axios'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { fetchPProductsLength, fetchAllProductsPagination } from '../redux/reducers/productsReducer'
import Product from '../types/Product'

const BrowseProducts = () => {
    const {products , loading, error, productsLength } = useAppSelector(state => state.productsReducer)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, settotalPages] = useState<number>(0)
    const limit = 50

    const dispatch = useAppDispatch()

    useEffect(() => {
        axios.get(`https://api.escuelajs.co/api/v1/products`)
            .then((response) => {
                settotalPages(Math.ceil(response.data.length / limit))
                console.log(Math.ceil(response.data.length / limit))
            })
            .catch(e => {
                const error = e as AxiosError
                console.log('Axios error, fetch all products:', error.response?.status, error.message)
            })
    },[])

    useEffect(() => {
        const offset = (currentPage - 1) * limit
        dispatch(fetchAllProductsPagination({offset, limit}))
        }, [currentPage])

    const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
        console.log(page)
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
                <Pagination count={totalPages} 
                color='standard'
                onChange={handlePageClick}
                defaultPage={currentPage}/>
        </Grid>}
        {!loading && products.map(p => 
            <Grid container spacing={2} 
                padding={1}
                key={p.id}>
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