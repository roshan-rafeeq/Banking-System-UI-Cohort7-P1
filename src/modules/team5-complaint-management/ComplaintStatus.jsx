
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ComplaintStatus() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/complaint/admin', {
      state: {
        filterName: name.trim(),
        filterPhone: phone.trim(),
      },
    });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Search Complaint Status</h1>

      {/* Loader Animation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <div style={{ position: 'relative', width: '130px' }}>
          {/* Bar 1 */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'linear-gradient(to right, rgb(161, 94, 255), rgb(217, 190, 255), rgb(161, 94, 255))',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            animation: 'barAnim 3s ease-in-out infinite alternate-reverse'
          }} />

          {/* Bar 2 */}
          <div style={{
            width: '50%',
            height: '8px',
            marginTop: '10px',
            background: 'linear-gradient(to right, rgb(161, 94, 255), rgb(217, 190, 255), rgb(161, 94, 255))',
            backgroundSize: '200% 100%',
            borderRadius: '10px',
            animation: 'barAnim 3s ease-in-out infinite alternate-reverse'
          }} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="tel"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button  style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }} type="submit">
            Search
          </button>
          <button
            type="button"
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px' }}
            onClick={() => {
              setName('');
              setPhone('');
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Image Display */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <img
          src="/images/complaintstatus.avif"
          alt="Complaint Status Illustration"
          style={{ maxWidth: '300px', width: '100%', borderRadius: '10px' }}
        />
      </div>

      {/* Email Contact Option */}
      {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ marginBottom: '8px' }}>Need help or have questions?</p>
        <a
          href="mailto:support@example.com?subject=Complaint%20Status%20Inquiry"
          style={{
            display: 'inline-block',
            padding: '10px 15px',
            border: '1px solid #17a2b8',
            borderRadius: '5px',
            color: '#17a2b8',
            textDecoration: 'none'
          }}
        >
          📧 Email Us
        </a>
      </div> */}

      {/* Keyframes injected via style tag */}
      <style>
        {`
          @keyframes barAnim {
            0% { background-position: left; }
            100% { background-position: right; }
          }
        `}
      </style>
    </div>
  );
}

export default ComplaintStatus;
