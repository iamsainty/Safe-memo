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
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form className="d-flex" role="search">
              {localStorage.getItem('token') === null ? (
                <div>
                  <Link className="btn btn-outline-light" to='/login' type="submit">Login</Link>
                  <Link className="btn btn-outline-light mx-4" to='/register' type="submit">Register</Link>
                </div>
              ) : (
                <Link className="btn btn-outline-light mx-4" to='/' onClick={handlelogout} type="submit">Logout</Link>
              )}

            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
