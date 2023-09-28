import Grid from '@mui/material/Unstable_Grid2'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Search from '../components/Search'

function HomeIcon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

const Root = () => {
    const loggedIn = false
  return (
    <div>
        <header>
            <nav>
                <Grid container 
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={4}
                spacing={2}>
                    <Grid xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/">
                            <HomeIcon fontSize='large'/>
                        </Link>
                    </Grid>
                    <Grid xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/browseproducts">
                            PRODUCTS
                        </Link>
                    </Grid>
                    <Grid xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Search/>
                    </Grid>
                    <Grid xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {!loggedIn ? 
                        <Link to="/login">
                        LOGIN
                        </Link> :
                        <Link to="/profilepage">
                        PROFILEPAGE
                        </Link>}
                    </Grid>
                    <Grid xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/shoppingcart">
                            SHOPPING CART
                        </Link>
                    </Grid>
                </Grid>
            </nav>
        </header>
                            
            <Outlet/>

        <footer>
        </footer>
    </div>
  )
}

export default Root