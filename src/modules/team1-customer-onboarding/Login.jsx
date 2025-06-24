import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from './Alert'

const Login = () => {
    const [credentials, setCredentials] = useState({ customerPhone: "", password: "" })
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const submit =async (e) => {
        e.preventDefault();
        const response = await fetch("https://b96b-103-141-55-30.ngrok-free.app/api/customer/authenticate",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerPhone: credentials.customerPhone, password: credentials.password })
        });
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate("/profile");
        }, 1500);
    }
    return (
        <>
            <Alert message={showAlert ? "Login successful!" : ""} onClose={() => setShowAlert(false)} />
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div className="card shadow-lg" style={{ maxWidth: "900px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
                    <div className="row g-0">
                        {/* Left: Login Form */}
                        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                            <div className="mb-4 text-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt="Bank Logo"
                                    style={{ width: "60px", marginBottom: "10px" }}
                                />
                                <h2 className="fw-bold" style={{ color: "#2d3a4b" }}>Bank Login</h2>
                                <p className="text-muted mb-4">Welcome back! Please login to your account.</p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="customerPhone"
                                        name="customerPhone"
                                        placeholder="Phone Number"
                                        onChange={onchange}
                                        style={{ borderRadius: "10px" }}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={onchange}
                                        style={{ borderRadius: "10px" }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                    style={{ borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem" }}
                                >
                                    Login
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <span className="text-muted">Don't have an account?</span>
                                <br />
                                <Link to="/register" className="fw-bold" style={{ color: "#2d3a4b" }}>
                                    Sign Up Here
                                </Link>
                            </div>
                        </div>
                        {/* Right: Image */}
                        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ background: "#f8f9fa" }}>
                            <img
                                src="/images/login_image.png"
                                alt="Banking"
                                className="img-fluid rounded-end"
                                style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
