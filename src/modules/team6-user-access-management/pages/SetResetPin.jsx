import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

export default function SetAtmPin() {
  const { customerId } = useContext(AuthContext);

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    // ✅ Group A: Fetch customer data using Group A ngrok URL
    axios
      .get(`https://914f-103-141-55-30.ngrok-free.app/api/customer/${customerId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const debitCards = response.data.debitCards || [];
        setCards(debitCards);
        if (debitCards.length > 0) {
          setSelectedCardId(debitCards[0].cardId);
        }
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [customerId]);

  const handleSubmit = () => {
    if (!selectedCardId) {
      alert("No card selected.");
      return;
    }

    if (pin.length !== 4 || confirmPin.length !== 4) {
      alert("PIN must be exactly 4 digits.");
      return;
    }

    if (pin !== confirmPin) {
      alert("PINs do not match.");
      return;
    }

    // ✅ Group B: Send PIN to your backend (Group B)
    axios
      .put(`https://your-backend-url/cards/pin/${selectedCardId}`, {
        customerId: customerId,
        pin: pin,
      })
      .then(() => alert("PIN set successfully."))
      .catch(() => alert("Failed to set PIN."));
  };

  return (
    <div className="container mt-5">
      <h4>Set ATM PIN</h4>

      <div className="mb-3 mt-4">
        <label className="form-label">Select Card</label>
        <select
          className="form-select"
          value={selectedCardId}
          onChange={(e) => setSelectedCardId(e.target.value)}
          disabled={cards.length === 0}
        >
          {cards.length > 0 ? (
            cards.map((card) => (
              <option key={card.cardId} value={card.cardId}>
                {card.cardNumber}
              </option>
            ))
          ) : (
            <option>No cards available</option>
          )}
        </select>
        {cards.length === 0 && (
          <small className="text-danger">No cards available for this customer.</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Enter New 4-digit PIN</label>
        <input
          type="password"
          className="form-control"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter new PIN"
          disabled={cards.length === 0}
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
          disabled={cards.length === 0}
        />
      </div>

      <div className="text-center">
        <button className="btn btn-primary px-5" onClick={handleSubmit} disabled={cards.length === 0}>
          Submit
        </button>
      </div>
    </div>
  );
}
