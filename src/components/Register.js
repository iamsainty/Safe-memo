import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfpassword: "" });
    let navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;  //destructuring assignment
        const response = await fetch("http://localhost:5001/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        }
    }
    const change = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #222222, #111111)', height: '100vh' }} >
                <div className="card p-4 rounded-circle-border shadow-lg" style={{ width: "50vh" }}>
                    <h2 className="text-center mb-4" style={{ fontSize: '4vh' }}><b>Secure your notes </b></h2>
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <input type="text" style={{border: '1px black solid', padding: '1vh'}} placeholder='your name' className="form-control" id="name" onChange={change} value={credentials.name} name='name' />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" onChange={change} value={credentials.email} name='email' style={{border: '1px black solid', padding: '1vh'}} placeholder='yourmail@example.com' aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" onChange={change} value={credentials.password} style={{border: '1px black solid', padding: '1vh'}} placeholder='your password' name='password' />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="cnfpassword" onChange={change} value={credentials.cnfpassword} style={{border: '1px black solid', padding: '1vh'}} placeholder='confirm password' name='cnfpassword' />
                        </div>
                        <button type="submit" className="btn btn-outline-dark btn-block" style={{ width: '100%' }}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register