import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const LandingPage = () => {
    if (!localStorage.getItem('token')) {
        Navigate('/');
    } else {
        Navigate('/mynotes')
    }
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
            <h1 style={{ color: 'white', fontSize: '6.5vh', fontWeight: 'bold' }}>
                Secret Script
            </h1>
            <p style={{ color: 'white', fontSize: '2.5vh' }}>
                Keep it private, keep it safe
            </p>
            <br />
            <p style={{ color: 'white', fontSize: '2vh', textAlign: 'center' }}>
                The secure platform to store your thoughts and ideas anonymously.
            </p>
            <br />
            <div className='mb-3'>
                <Link className='btn btn-outline-light' to='/login' style={{marginRight: '1vh', width: '15vh'}}>Login</Link>
                <Link className='btn btn-outline-light' to='/register' style={{marginLeft: '1vh', width: '15vh'}}>Register</Link>
            </div>
        </div>

    );
};

export default LandingPage;
