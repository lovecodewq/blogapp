import React from 'react'
import logo from '../assets/blog_logo.webp'

interface LogoProps {
  width?: string
  maxHeight?: string
}
function Logo({ width = '50%', maxHeight = '100px' }: LogoProps) {
  return (
    <img
      className='rounded-full'
      src={logo}
      style={{ width, maxHeight, background: 'transparent' }}
      alt='Logo placeholder'
    />
  )
}

export default Logo
