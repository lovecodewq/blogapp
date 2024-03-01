import { useState, useEffect } from 'react'
import service from './appwrite/service';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    service.getCurrentUser().then((userData)=> {
      if (userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout())
      }
    }).finally(()=> setLoading(false));
  }, [dispatch])
  return !loading ?(
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header></Header>
          <main>
            <Outlet/>
          </main>
        </div>
        <div className='w-full block'>
          <Footer></Footer>
        </div>
      </div>
  ) :null
}

export default App
