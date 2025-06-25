import { useState } from 'react';

export default function Blockcard() {
  const [cardNumber, setCardNumber] = useState('');
  const [reason, setReason] = useState('');

  const handleBlock = () => {
    if (!cardNumber || !reason) {
      alert("Please select a card and a reason.");
      return;
    }

    // 👉 You can add your API call here
    alert(`Card ${cardNumber} has been blocked.\nReason: ${reason}`);
  };

  return (
    <div className="container mt-5">
      <h4>Block Card</h4>

      {/* Select Card */}
      

      {/* Select Reason */}
      <div className="mb-3">
        <label className="form-label">Reason for Blocking</label>
        <select
          className="form-select"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">-- Select Reason --</option>
          <option value="Lost card">Lost card</option>
          <option value="Stolen card">Stolen card</option>
          <option value="Suspicious activity">Suspicious activity</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Centered Button */}
      <div className="text-center mt-4">
        <button className="btn btn-danger px-5" onClick={handleBlock}>
          Block
        </button>
      </div>
    </div>
  );
}
