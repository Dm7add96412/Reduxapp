import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2'
import Alert from '@mui/material/Alert'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { clearFiltering, fetchAllCategories, fetchFilterProducts, fetchProductsLength, fetchAllProductsPagination } from '../redux/reducers/productsReducer'
import Categories from '../types/Categories'

const Filters = () => {
    const [selectedCategory, setSelectedCategory] = useState<Categories | undefined>(undefined)
    const { categories, page } = useAppSelector(state => state.productsReducer)
    const limit = 50
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(fetchAllCategories())
    }, [])

    const handleClick = (categoryId: number) => {
      dispatch(fetchFilterProducts(categoryId))
      setSelectedCategory(categories ? categories.find(c => c.id === categoryId) : undefined)
    }

    const emptyFilters = () => {
      dispatch(clearFiltering(true))
      dispatch(fetchProductsLength())
      const offset = (page - 1) * limit
      dispatch(fetchAllProductsPagination({offset, limit}))
      setSelectedCategory(undefined)
    }

  return (
    <Box display='flex'
    flexDirection='row'
    alignItems='center'
    justifyContent='center'>
      <Grid container spacing={2}
        padding={2}
        justifyContent="center"
        alignItems="center">
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
          <Button size='small'
            variant='text'
            onClick={() => emptyFilters()}>
              ALL PRODUCTS
            </Button>
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
            {categories ? categories.map(c => 
              <Button
              size='small'
              variant='text'
              key={c.id}
              onClick={() => handleClick(c.id)}>
                {c.name}
              </Button> 
              ) : null}
          </Grid>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
          {selectedCategory !== undefined ? <Alert severity='info'>Products in category {selectedCategory.name}</Alert> : null}
          </Grid>
      </Grid>
    </Box>
  )
}

export default Filters