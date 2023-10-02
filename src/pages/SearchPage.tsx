import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import useAppSelector from '../hook/useAppSelector'
import useAppDispatch from '../hook/useAppDispatch'
import { findProducts } from '../redux/reducers/productsReducer'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const searchWord = params.searchWord
  const navigate = useNavigate()
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
            {error ? <Alert severity="error"> Error finding products with searchword: {searchWord}! </Alert> : null}
            {!error && loading ? <CircularProgress/> : 
            null}
            {!error && !loading && <Alert severity="info"> Found {foundProducts?.length} results with searchword: {searchWord} </Alert>}
        </Grid>

        <Grid container spacing={2}
                padding={2}
                justifyContent="center"
                alignItems="center"
                >
            <Grid xs={3}></Grid>
            <Grid xs={6} rowGap={6}>
            {!error && !loading && foundProducts?.map(p => 
                <Grid container spacing={-2} 
                    padding={4}
                    key={p.id}
                    border={1}
                    borderRadius={4}
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

export default SearchPage