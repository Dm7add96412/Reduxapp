import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div>
        <header>
            <nav>
                <Box sx={{flexGrow: 1}}
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
                padding={2}>
                    <p>TEST TEST</p>
                </Box>
            </nav>
        </header>
        <Outlet/>
        <footer>
        </footer>
    </div>
  )
}

export default Root