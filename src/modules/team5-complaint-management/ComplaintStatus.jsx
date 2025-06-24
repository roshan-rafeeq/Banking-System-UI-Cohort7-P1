import React from 'react';

function ComplaintStatus() {
  return (
    <div id="Complaint">
      <div style={{ padding: '30px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Request Status</h1>

        {/* Row to separate form and image */}
        <div className="container py-4" style={{ maxWidth: '1000px' }}>
          <div className="row align-items-center">
            {/* Left: Form */}
            <div className="col-md-6">
              <form>
                

                {/* Name */}
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    placeholder="Name"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                    }}
                    required
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                    }}
                    required
                  />
                </div>

                {/* Buttons */}
                <div>
                  <button type="submit" className="btn btn-primary me-2">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Image */}
            <div className="col-md-6 text-center">
              <img
                src="/images/complaintstatus.avif"
                alt="Ticket Status"
                style={{
                  width: '80%',
                  height: 'auto',
                  maxWidth: '300px',
                  borderRadius: '10px',
                  marginTop: '15px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Complaint Procedure */}
        <h2 className="text-primary mt-5 mb-3">Raise a Complaint</h2>
        <p>
          If you have a complaint to submit to the bank for resolution, please follow the procedure below.
        </p>

        <div className="row mt-4" style={{ display: 'flex', gap: '30px' }}>
          {/* Left Levels */}
          <div className="col-md-5">
            <div
              style={{
                backgroundColor: '#fff8e1',
                padding: '20px',
                marginBottom: '20px',
                borderLeft: '4px solid orange',
                borderRadius: '8px',
              }}
            >
              <strong style={{ color: 'orange' }}>Level 1</strong>
              <h5 style={{ marginTop: '10px' }}>
                Not satisfied with our previous response?
              </h5>
            </div>

            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                marginBottom: '20px',
                borderRadius: '8px',
              }}
            >
              <strong>Level 2</strong>
              <p>Not satisfied with the resolution provided on the Level 1</p>
            </div>

            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
              }}
            >
              <strong>Level 3</strong>
              <p>Not satisfied with the resolution given?</p>
            </div>
          </div>

          {/* Right Procedure Content */}
          <div className="col-md-5">
            {/* <h5 style={{ color: '#0d6efd' }}></h5> */}
            <h6 style={{ color: 'orange' }}>Not satisfied with our previous response?</h6>
            <p>
              If the resolution you received does not meet your expectations, please share the
              details of your complaint with our Phone Banking escalation team via email.
            </p>

            <div className="mb-3">
              <a
                href="mailto:support@example.com?subject=Complaint&body=Dear Support,"
                style={{ textDecoration: 'none' }}
              >
                <button className="btn btn-warning rounded-pill px-4 me-3">
                  Send an Email
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
