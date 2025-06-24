// src/pages/ActivateCard.jsx
import { useState } from 'react';

export default function ActivateCard() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleActivate = () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      alert('PIN must be 4 digits.');
      return;
    }

    if (pin !== confirmPin) {
      alert('PINs do not match. Please try again.');
      return;
    }

    // Proceed to API call
    alert(`Card Activated with PIN: ${pin}`);
  };

  return (
    <div className="container mt-5">
      <h4>Activate Debit Card</h4>
      <p className="text-muted">Click below to activate your card</p>

      <div className="mb-3">
        <label htmlFor="pinInput" className="form-label">Enter 4-digit PIN</label>
        <input
          type="password"
          className="form-control"
          id="pinInput"
          placeholder="Enter PIN"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPinInput" className="form-label">Confirm 4-digit PIN</label>
        <input
          type="password"
          className="form-control"
          id="confirmPinInput"
          placeholder="Re-enter PIN"
          maxLength={4}
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleActivate}>
        Activate Now
      </button>
    </div>
  );
}
