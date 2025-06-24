import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert'

const Login = () => {
    const [credentials, setCredentials] = useState({  username: "", password: ""})
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const submit=(e)=>{
         e.preventDefault();
         setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate("/PersonalPage");
        }, 1500); // Show alert for 1.5 seconds, then navigate
        
    }
    return (
        <>
         <Alert message={showAlert ? "Login successful!" : ""} onClose={() => setShowAlert(false)} />
        <div>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card shadow" style={{ maxWidth: "800px", width: "100%" }}>
                    <div className="row g-0">
                        {/* Left: Sign Up Form */}
                        <div className="col-md-6 p-4">
                            <h3 className="mb-4">Login</h3>
                            <form onSubmit={submit}>
                           <div className="mb-3">
                                    {/* <label htmlFor="userName" className="form-label">User Name</label> */}
                                    <input type="text" className="form-control" id="username" name="username" placeholder="User Name" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="password" className="form-label">Password</label> */}
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onchange} />
                                </div>
                                
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                        </div>
                        {/* Right: Image */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center" style={{ background: "#f8f9fa" }}>
                            <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                                alt="Sign Up"
                                className="img-fluid rounded-end"
                                style={{ maxHeight: "350px", objectFit: "cover" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login
