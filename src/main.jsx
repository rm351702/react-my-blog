import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home />,
    errorElement: <Home />,
  },
  { 
    path: 'post/:slug', 
    element: <Post /> 
  },
  { 
    path: 'posts', 
    element: <AllPosts /> 
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
