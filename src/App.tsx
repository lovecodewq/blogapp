import { useState, useEffect } from 'react'
import Login from './components/login'
import service from './appwrite/service';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
