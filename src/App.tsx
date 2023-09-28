import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Root from './pages/Root'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      // children: [
      //   {
      //     path: "/browseproducts",
      //     element: <BrowseProducts/>
      //   },
      //   {
      //     path: "/singleproduct/:productId",
      //     element: <SingleProduct/>
      //   },
      //   {          
      //     path: "/search/:searchWord",
      //     element: <SearchPage/>
      //   },
      //   {
      //     path: "/shoppingcart",
      //     element: <ShoppingCart/>
      //   },
      //   {
      //     path: "/profilepage",
      //     element: <ProfilePage/>
      //   }
      // ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App