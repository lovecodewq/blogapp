import { useState } from 'react'
import Login from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Login></Login>
    </>
  )
}

export default App
