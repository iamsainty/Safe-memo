import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials]=useState({email: "", password: ""});
    let navigate=useNavigate()
    const handlesubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showalert("Successfully logged in", "success");
        }
        else{
            props.showalert("Invalid  Credentials", "danger");
        }
    }
    const change = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={change} value={credentials.email} name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={change} value={credentials.password} name='password' />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </div>
    )
}

export default Login