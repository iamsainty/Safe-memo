import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const handlelogout=()=>{
    localStorage.removeItem("token")
    window.location.reload();
   }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><b style={{fontWeight: 'bolder', paddingLeft: '3vh'}}>Secret Script</b></Link >
            <form className="d-flex" role="search">
              {localStorage.getItem('token') !== null ? (
                <div>
                  <Link className="btn btn-outline-light mx-4" to='/' onClick={handlelogout} type="submit"> <i class="fa-solid fa-right-from-bracket"></i></Link>
                </div>
              ) : (
                <div></div>
              )}
            </form>
          </div>
      </nav>
    </div>
  )
}

export default Navbar
