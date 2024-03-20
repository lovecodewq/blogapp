import { useState, useEffect } from 'react'
import service from './appwrite/service'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store/store'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/footer/Footer'
import { useNavigate } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authStatus = useSelector((state: RootState) => state.auth.status)
  useEffect(() => {
    if (authStatus) {
      service
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }))
          } else {
            dispatch(logout())
          }
        })
        .finally(() => setLoading(false))
    } else {
      navigate('/login')
    }
  }, [authStatus, dispatch])
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header></Header>
        <main>
          <Outlet />
        </main>
      </div>
      <div className='w-full block'>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App
