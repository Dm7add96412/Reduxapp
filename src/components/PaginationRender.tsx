import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Pagination from '@mui/material/Pagination'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { preservePagination } from '../redux/reducers/productsReducer'

const PaginationRender = () => {
    const {loading, error, productsLength, page} = useAppSelector(state => state.productsReducer)
    const dispatch = useAppDispatch()
    const limit = 50

    const handlePageClick = (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(preservePagination(page))
  }
  
  return (
    <Grid container spacing={2}
    padding={1}
    justifyContent="center"
    alignItems="center">  
                {!error && !loading &&
                <Pagination count={productsLength && Math.ceil(productsLength / limit)} 
                color='standard'
                onChange={handlePageClick}
                page={page}/>}
    </Grid>
  )
}

export default PaginationRender