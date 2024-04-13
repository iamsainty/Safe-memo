import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(credentials.username===''){
                setMsg('Enter your username');
                return;
            }
            const pattern=/^[a-z0-9]+$/;
            if(!pattern.test(credentials.username)){
                setMsg('Username should contain only lowercase alphabets and numbers');
                return;
            }
            if(credentials.password===''){
                setMsg('Enter your password');
                return ;
            }
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: credentials.username, password: credentials.password }),
            });
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                localStorage.setItem('token', json.authtoken);
                navigate('/mynotes');
                window.location.reload();
            } else {
                setMsg(json.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMsg('An error occurred. Please try again later.');
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #222222, #111111)', height: '100vh' }}>
            <div className="card p-4 rounded-circle-border shadow-lg container" style={{ marginLeft: '4vh',marginRight: '4vh', width: "50vh" }}>
                <h2 className="text-center mb-4" style={{ fontSize: '4vh' }}><b>Get your notes </b></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="username" onChange={handleChange} value={credentials.username} name='username' placeholder='Username' style={{ border: '1px black solid', padding: '1vh' }} aria-describedby="usernameHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} placeholder='Your password' style={{ border: '1px black solid' }} name='password' />
                    </div>
                    <div style={{ color: 'red', paddingBottom: '2vh' }}>{msg}</div>
                    <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Login</button>
                    <p style={{ fontSize: '1.75vh', paddingTop: '2.5vh' }}>Don't have an account ? <Link to='/register'>Register now</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;
