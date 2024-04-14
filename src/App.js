// app.js

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';

function App() {
  document.body.style.background =
    'linear-gradient(to right, #222222, #111111)';

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('token');
    if (authToken) {
      // User is authenticated, redirect to /mynotes if they try to access /login, /register, or /
      const currentPath = window.location.pathname;
      if (currentPath === '/login' || currentPath === '/register' || currentPath === '/') {
        window.location.to = '/mynotes';
      }
    }
    else{
      window.location.to='/'
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <NoteState>
          <Routes>
            <Route exact path="/" element={
              localStorage.getItem('token') ? (
                <Navigate to="/mynotes" />
              ) : (
                <LandingPage />
              )
            } />
            <Route exact path="/mynotes" element={
              localStorage.getItem('token') ? (
                <Home/>
              ) : (
                <Navigate to="/" />
              )
            } />
            {/* Add a check for authentication before rendering the Login and Register components */}
            <Route
              exact
              path="/login"
              element={
                localStorage.getItem('token') ? (
                  <Navigate to="/mynotes" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                localStorage.getItem('token') ? (
                  <Navigate to="/mynotes" />
                ) : (
                  <Register />
                )
              }
            />
          </Routes>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;
