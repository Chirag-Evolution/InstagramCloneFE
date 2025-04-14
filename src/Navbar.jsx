import React from 'react'
import instagram from './assets/instagram.png';
import './Navbar.css'
import { Link } from 'react-router';
export default function Navbar() {
  return (
 <nav className="navbar navbar-light bg-light">
  <div className="container-fluid d-flex" style={{justifyContent:'space-around'}}>
    <a className="navbar-brand" href="#">
      <img src={instagram} alt="" width="30" height="24" className="d-inline-block align-text-top"/>
    </a>
    <ol>
       <li> <Link to='/signup' style={{ color: 'inherit', textDecoration: 'none' }}>
        Sign Up
        </Link></li>
        <li><Link to={{
    pathname: "/signin"}} style={{ color: 'inherit', textDecoration: 'none' }}>Sign In</Link></li>
        {/* <li>Profile</li> */}
    </ol>
  </div>
</nav> 
    
  )
}
