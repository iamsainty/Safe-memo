import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='container'>
            <div style={{ marginTop: '20vh', color: 'white', fontWeight: 'bolder', fontSize: '5vh' }}>

                Secret Script
            </div>
            <div style={{ marginTop: '1vh', color: 'white', fontWeight: '500', fontSize: '4vh' }}>

                Keep it private, keep it safe
            </div>
            <Link className='btn btn-outline-light' style={{marginRight: '5vh'}} to='/login'>Login</Link>
            <Link className='btn btn-outline-light' to='/register'>Register</Link>
        </div>
    )
}

export default LandingPage
