import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/store.ts'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Protected from './components/AuthLayout.tsx'
import Signup from './pages/Signup.tsx'
import AllPosts from './pages/AllPosts.tsx'
import AddPost from './pages/AddPost.tsx'
import EditPost from './pages/EditPost.tsx'
import Post from './pages/Post.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/singup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        )
      }, 
      {
        path: "/edit-post/:postId",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/post/:postId",
        element: (
          <Protected authentication={true}>
            <Post></Post>
          </Protected>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
