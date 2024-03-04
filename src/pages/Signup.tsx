import React, { useEffect } from 'react'
import { Signup as SignupComponent } from '../components'

function Signup() {
  useEffect(() => {
    console.log('Signup')
  }, [])
  return (
    <div className='py-8'>
      <SignupComponent />
    </div>
  )
}

export default Signup
