import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'
import signupImage from '/images/signup_image.png'

// Use a banking-related Unsplash image

const SignUp = () => {
    const [gender, setGender] = useState('')
    const [credentials, setCredentials] = useState({
        fullname: "", username: "", password: "", nationality: "", address: "",
        phone: "", dob: "", gmail: "", income: "", pancard: "", aadhar: ""
    })
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault();
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate("/login");
        }, 1500);
    }

    return (
        <>
            <Alert message={showAlert ? "Registration successful!" : ""} onClose={() => setShowAlert(false)} />
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div className="card shadow-lg" style={{ maxWidth: "950px", width: "100%", borderRadius: "22px", overflow: "hidden" }}>
                    <div className="row g-0">
                        {/* Left: Image */}
                        <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ background: "#f8f9fa" }}>
                            <img
                                src={signupImage}
                                alt="Sign Up"
                                className="img-fluid rounded-start"
                                style={{ maxHeight: "420px", objectFit: "cover", width: "100%" }}
                            />
                        </div>
                        {/* Right: Form */}
                        <div className="col-md-7 p-5">
                            <h2 className="mb-2 fw-bold" style={{ color: "#2d3a4b" }}>Create Your Account</h2>
                            <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>Join our bank and manage your finances with ease.</p>
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="fullname" name="fullname" placeholder="Full Name" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="address" name="address" placeholder="Address" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="number" className="form-control form-control-lg" id="phone" name="phone" placeholder="Phone Number" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="nationality" name="nationality" placeholder="Nationality" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="date" className="form-control form-control-lg" id="dob" name="dob" placeholder="Date of Birth" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        {/* Gender */}
                                        <div className='mb-3 d-flex gap-4 align-items-center'>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value="Male"
                                                    checked={gender === "Male"}
                                                    onChange={handleGenderChange}
                                                />
                                                <label className="form-check-label" htmlFor="male">
                                                    Male
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="female"
                                                    value="Female"
                                                    checked={gender === "Female"}
                                                    onChange={handleGenderChange}
                                                />
                                                <label className="form-check-label" htmlFor="female">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="username" name="username" placeholder="User Name" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Password" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control form-control-lg" id="gmail" name="gmail" placeholder="Gmail" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="income" name="income" placeholder="Income" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="pancard" name="pancard" placeholder="Pan Card" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control form-control-lg" id="aadhar" name="aadhar" placeholder="Aadhar Number" onChange={onchange} style={{ borderRadius: "10px" }} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2 mt-2" style={{ borderRadius: "10px", fontWeight: "bold", fontSize: "1.1rem" }}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
