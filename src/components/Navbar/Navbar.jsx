import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { userContext } from '../../context/UserContext'

export default function Navbar() {
  const {logout,token} =useContext(userContext)
  return <>
  <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
    <div className="container">
    <Link className="navbar-brand fw-bold fs-3" to="/">Master Note</Link>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
       {token ? <> <button onClick={logout} className="Btn">
  
    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
       <div className="text">Logout</div>
    </button>
       
       </>: <> <li className="nav-item mx-2 ">   
          <NavLink className="nav-link px-1" to="/login">Login</NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link px-1" to="/register">Register</NavLink>
        </li>
       </>}
       
       
      </ul>
     
    </div>
  </div>
</nav>

  
  </>
       
}
