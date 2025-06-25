import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const getProfile = async () => {
    try {
      const response = await fetch(`https://914f-103-141-55-30.ngrok-free.app/api/customer/${state}`, {
        method: "GET",
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();
      if (json && json.Customer) {
        setProfile(json.Customer);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      alert("Failed to load profile.");
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  if (!profile) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
        }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <h5 className="mt-3 animate__animated animate__fadeIn">Loading profile...</h5>
        </div>
      </div>
    );
  }

  // Helper for avatar initials
  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
      }}
    >
      <div className="card shadow-lg border-0 animate__animated animate__fadeInUp" style={{ maxWidth: 900, width: "100%", borderRadius: "22px" }}>
        <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between" style={{ borderTopLeftRadius: "22px", borderTopRightRadius: "22px" }}>
          <div className="d-flex align-items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", objectFit: "cover", border: "3px solid #fff" }}
            />
            <div>
              <h4 className="mb-0 fw-bold"><i className="bi bi-bank2 me-2"></i>Customer Profile</h4>
              <span className="badge bg-light text-primary mt-1" style={{ fontSize: "1rem" }}>
                <i className="bi bi-person-badge me-1"></i>
                {profile.customerId}
              </span>
            </div>
          </div>
          <Button className="btn btn-outline-light" onClick={()=>{navigate("/accounts/create",{state:state})}}>Create Account</Button>
          {/* <button
            className="btn btn-outline-light"
            onClick={() => navigate("/login", { replace: true })}
            title="Logout"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button> */}
        </div>

        <div className="card-body px-4 py-4">
          <section className="mb-4">
            <h5 className="text-primary mb-3"><i className="bi bi-person-fill me-2"></i> Personal Details</h5>
            <div className="row g-3">
              <div className="col-md-6"><strong>Name:</strong> {profile.customerName}</div>
              <div className="col-md-6"><strong>DOB:</strong> {profile.customerDOB}</div>
              <div className="col-md-6"><strong>Gender:</strong> {profile.customerGender || <span className="text-muted">Not specified</span>}</div>
              <div className="col-md-6"><strong>Email:</strong> {profile.customerEmail}</div>
              <div className="col-md-6"><strong>Phone:</strong> {profile.customerPhone}</div>
              <div className="col-md-6"><strong>Nationality:</strong> {profile.nationality}</div>
              <div className="col-md-6"><strong>Income:</strong> ₹{Number(profile.customerIncome).toLocaleString()}</div>
            </div>
          </section>

          <hr />

          <section className="mb-4">
            <h5 className="text-primary mb-3"><i className="bi bi-geo-alt-fill me-2"></i> Address</h5>
            <div className="row g-3">
              <div className="col-md-6"><strong>City:</strong> {profile.customerAddress?.city || <span className="text-muted">Not provided</span>}</div>
              <div className="col-md-6"><strong>State:</strong> {profile.customerAddress?.state || <span className="text-muted">Not provided</span>}</div>
              <div className="col-md-6"><strong>Country:</strong> {profile.customerAddress?.country || <span className="text-muted">Not provided</span>}</div>
              <div className="col-md-6"><strong>Pincode:</strong> {profile.customerAddress?.pincode || <span className="text-muted">Not provided</span>}</div>
            </div>
          </section>

          <hr />

          <section>
            <h5 className="text-primary mb-3"><i className="bi bi-shield-lock-fill me-2"></i> Identity Details</h5>
            <div className="row g-3">
              <div className="col-md-6"><strong>PAN:</strong> {profile.customerPanNumber}</div>
              <div className="col-md-6"><strong>Aadhar:</strong> {profile.customerAadharNumber}</div>
            </div>
          </section>
        </div>
        <div className="card-footer text-end bg-white" style={{ borderBottomLeftRadius: "22px", borderBottomRightRadius: "22px" }}>
          <button
            className="btn btn-danger px-4"
            onClick={() => navigate("/login", { replace: true })}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
