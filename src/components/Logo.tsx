import React from 'react'

interface LogoProps {
  width?: string
  maxHeight?: string
}
function Logo({ width = '100%', maxHeight = '100px' }: LogoProps) {
  return (
    <img
      src='https://images.pexels.com/photos/3077882/pexels-photo-3077882.jpeg?auto=compress&cs=tinysrgb&w=600'
      style={{ width, maxHeight, background: 'transparent' }}
      alt='Logo placeholder'
    />
  )
}

export default Logo
