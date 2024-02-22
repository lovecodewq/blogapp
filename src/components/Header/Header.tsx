import React from 'react'
import Container from '../container/Container'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
    const authStatus = useSelector((state) => state.auth.status);
  return (
    <div>Header</div>
  )
}

export default Header