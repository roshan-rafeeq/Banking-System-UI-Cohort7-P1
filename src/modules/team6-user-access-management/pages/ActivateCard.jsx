// src/pages/ActivateCard.jsx
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function ActivateCard() {
  const { cardId } = useParams();
  const { state } = useLocation();
  const card = state?.card;

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleActivate = () => {
    if (!pin || !confirmPin) {
      alert("Please enter and confirm the PIN.");
      return;
    }
    if (pin !== confirmPin) {
      alert("PINs do not match.");
      return;
    }

    axios.put(`https://your-backend-url/cards/activate/${cardId}`, { pin })
      .then(() => alert(`Card ${card?.cardNumber} activated successfully.`))
      .catch(() => alert("Failed to activate the card."));
  };

  return (
    <div className="container mt-4">
      <h5>Activate Card</h5>
      <p>Card Number: {card?.cardNumber}</p>

      <div className="mb-3">
        <label className="form-label">Enter PIN</label>
        <input
          type="password"
          className="form-control"
          value={pin}
          maxLength={4}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm PIN</label>
        <input
          type="password"
          className="form-control"
          value={confirmPin}
          maxLength={4}
          onChange={(e) => setConfirmPin(e.target.value)}
        />
      </div>

      <button className="btn btn-success mt-3" onClick={handleActivate}>
        Confirm Activation
      </button>
    </div>
  );
}
