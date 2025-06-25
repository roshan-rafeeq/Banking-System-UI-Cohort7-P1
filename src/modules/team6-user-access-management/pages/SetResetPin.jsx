import { useState } from 'react';

export default function SetAtmPin() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      alert("PIN must be exactly 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      alert("PINs do not match.");
      return;
    }

    // ✅ You can now send this pin to backend securely
    alert(`ATM PIN has been set successfully.`);
  };

  return (
    <div className="container mt-5">
      <h4>Reset  PIN</h4>

      <div className="mb-3 mt-4">
        <label className="form-label">Enter New 4-digit PIN</label>
        <input
          type="password"
          className="form-control"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter new PIN"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm PIN</label>
        <input
          type="password"
          className="form-control"
          maxLength={4}
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          placeholder="Re-enter new PIN"
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary px-5" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
