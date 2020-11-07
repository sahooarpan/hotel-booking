import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
<nav class="navbar navbar-light bg-light">
  <Link to='/' class="navbar-brand">
    Hotel Booking
  </Link>
</nav> 
    )
}

export default Header
