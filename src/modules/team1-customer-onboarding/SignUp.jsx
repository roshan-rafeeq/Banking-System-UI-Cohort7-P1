import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'
import signupImage from '/images/bank.jpg' // <-- import your image

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
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card shadow" style={{ maxWidth: "900px", width: "100%" }}>
                    <div className="row g-0">
                        {/* Left: Image */}
                        <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ background: "#f8f9fa" }}>
                            <img
                                src={signupImage}
                                alt="Sign Up"
                                className="img-fluid rounded-start"
                                style={{ maxHeight: "350px", objectFit: "cover" }}
                            />
                        </div>
                        {/* Right: Form */}
                        <div className="col-md-8 p-4">
                            <h3 className="mb-4">Sign Up</h3>
                            <form onSubmit={submit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Full Name" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="address" name="address" placeholder="Address" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="number" className="form-control" id="phone" name="phone" placeholder="Phone Number" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="nationality" name="nationality" placeholder="Nationality" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="date" className="form-control" id="dob" name="dob" placeholder="Date of Birth" onChange={onchange} />
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
                                            <input type="text" className="form-control" id="username" name="username" placeholder="User Name" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" id="gmail" name="gmail" placeholder="Gmail" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="income" name="income" placeholder="Income" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="pancard" name="pancard" placeholder="Pan Card" onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="aadhar" name="aadhar" placeholder="Aadhar Number" onChange={onchange} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div> */}
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp
