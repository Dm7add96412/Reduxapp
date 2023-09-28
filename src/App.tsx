import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Root from './pages/Root'
import HomePage from './pages/HomePage'
import BrowseProducts from './pages/BrowseProducts'
import ShoppingCart from './pages/ShoppingCart'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SearchPage from './pages/SearchPage'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "/browseproducts",
          element: <BrowseProducts/>
        },
        // {
        //   path: "/singleproduct/:productId",
        //   element: <SingleProduct/>
        // },
        {          
          path: "/search/:searchWord",
          element: <SearchPage/>
        },
        {
          path: "/shoppingcart",
          element: <ShoppingCart/>
        },
        {
          path: "/profilepage",
          element: <Profile/>
        },
        {
          path: "/login",
          element: <Login/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App