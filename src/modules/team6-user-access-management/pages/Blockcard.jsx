
           import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Blockcard() {
  const { customerId } = useParams();
  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [reason, setReason] = useState("");
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://914f-103-141-55-30.ngrok-free.app/api/customer/${customerId}`, {
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
        setSelectedCardDetails(debitCards[0]);
      }
    })
    .catch((error) => {
      console.error("Error fetching cards:", error);
    });
  }, [customerId]);

  const handleCardChange = (e) => {
    const cardId = e.target.value;
    setSelectedCardId(cardId);
    const foundCard = cards.find((card) => card.cardId === cardId);
    setSelectedCardDetails(foundCard || null);
  };

  const handleBlock = () => {
    if (!reason) {
      alert("Please provide a reason for blocking.");
      return;
    }

    if (!selectedCardId || !selectedCardDetails) {
      alert("Please select a card.");
      return;
    }

    if (selectedCardDetails.status?.toLowerCase() === "blocked") {
      alert("This card is already blocked.");
      return;
    }

    axios.put(`https://your-backend-url/cards/block/${selectedCardId}`, {
      reason,
    })
    .then(() => alert(`Card ${selectedCardDetails.cardNumber} blocked successfully.`))
    .catch(() => alert("Failed to block the card."));
  };

  return (
    <div className="container mt-4">
      <h5>Block Debit Card</h5>

      {cards.length > 0 ? (
        <>
          <div className="mb-3">
            <label className="form-label">Select Card</label>
            <select
              className="form-select"
              value={selectedCardId}
              onChange={handleCardChange}
            >
              {cards.map((card) => (
                <option key={card.cardId} value={card.cardId}>
                  {card.cardNumber}
                </option>
              ))}
            </select>
          </div>

          {selectedCardDetails && (
            <div className="mb-3">
              <p><strong>Card Number:</strong> {selectedCardDetails.cardNumber}</p>
              <p><strong>Status:</strong> {selectedCardDetails.status}</p>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Reason for Blocking</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. lost, stolen etc."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button className="btn btn-danger mt-2" onClick={handleBlock}>
            Confirm Block
          </button>
        </>
      ) : (
        <p>No cards found for this customer.</p>
      )}
    </div>
  );
}
