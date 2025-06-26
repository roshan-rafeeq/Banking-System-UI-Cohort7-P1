// src/pages/ActivateCard.jsx
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

export default function ActivateCard() {
  const { customerId } = useContext(AuthContext); // From Group A

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    // Group B API call using customerId
    axios
      .get(`https://your-groupB-backend-url/cards/by-customer/${customerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const cards = response.data.debitCards || [];
        setCards(cards);
        if (cards.length > 0) {
          setSelectedCardId(cards[0].cardId);
          setSelectedCard(cards[0]);
        }
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, [customerId]);

  const handleCardChange = (e) => {
    const cardId = e.target.value;
    setSelectedCardId(cardId);
    const found = cards.find((card) => card.cardId === cardId);
    setSelectedCard(found);
  };

  const handleActivate = () => {
    if (!selectedCardId || !pin || !confirmPin) {
      alert("Please fill in all fields.");
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

    // Send to your Group B backend
    axios
      .put(`https://your-groupB-backend-url/cards/activate/${selectedCardId}`, { pin })
      .then(() => alert(`Card ${selectedCard?.cardNumber} activated successfully.`))
      .catch(() => alert("Failed to activate the card."));
  };

  return (
    <div className="container mt-5">
      <h4>Activate Debit Card</h4>

      <div className="mb-3 mt-4">
        <label className="form-label">Select Card</label>
        <select
          className="form-select"
          value={selectedCardId}
          onChange={handleCardChange}
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
        <label className="form-label">Enter 4-digit PIN</label>
        <input
          type="password"
          className="form-control"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          disabled={cards.length === 0}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm PIN</label>
        <input
          type="password"
          className="form-control"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          maxLength={4}
          disabled={cards.length === 0}
        />
      </div>

      <div className="text-center">
        <button
          className="btn btn-success px-5"
          onClick={handleActivate}
          disabled={cards.length === 0}
        >
          Confirm Activation
        </button>
      </div>
    </div>
  );
}
