import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

const SearchPage = () => {
  return (
    <Box display='flex'
    flexDirection='column'
    alignItems='space-around'>
        <Grid container spacing={2} 
                padding={1}>
                SEARCH
        </Grid>  
    </Box>
  )
}

export default SearchPage