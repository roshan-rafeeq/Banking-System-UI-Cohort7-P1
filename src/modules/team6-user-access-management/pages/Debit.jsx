import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Debit() {
  const { customerId } = useParams(); // From URL like /debit/1
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

axios.get(`https://914f-103-141-55-30.ngrok-free.app/api/customer/CUSTYEM3M8`, {
  headers: {
    'ngrok-skip-browser-warning': 'true',   // Required to bypass ngrok browser warning
    'Content-Type': 'application/json'      // Optional, but good to have
  }
})
.then((response) => {
  console.log("Data:", response.data);
})
.catch((error) => {
  console.error("Error fetching customer data:", error);
});

  useEffect(() => {
    // Dummy API for testing – replace later with your backend link
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        const dummyCards = response.data.map((user, i) => ({
          cardId: user.id,
          cardNumber: `XXXX-XXXX-XXXX-${1000 + user.id}`,
          cvv: `${100 + i}`,
          expiryDate: `12/2${i}`,
          status: "active"
        }));
        setCards(dummyCards);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [customerId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  if (cards.length === 0) return <p>Loading cards...</p>;

  const card = cards[currentIndex];

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Debit Card Services</h4>

      <div className="card mb-3 p-4 bg-primary text-white">
        <h5>Debit Card</h5>
        <p>Card Number: {card.cardNumber}</p>
        <p>CVV: {card.cvv}</p>
        <p>Expiry Date: {card.expiryDate}</p>
        <p>Status: {card.status}</p>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-outline-light me-2" onClick={handlePrev}>Previous</button>
        <button className="btn btn-outline-light" onClick={handleNext}>Next</button>
      </div>

      <div className="row text-center">
        <div className="col-6 mb-3">
          <Link
            to={`/debit/block/${card.cardId}`}
            state={{ card }}
            className="btn btn-outline-danger w-100 py-3"
          >
            <i className="bi bi-ban"></i><br />Block Card
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link
            to={`/debit/limits/${card.cardId}`}
            state={{ card }}
            className="btn btn-outline-primary w-100 py-3"
          >
            <i className="bi bi-sliders"></i><br />Manage Usage
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link
            to={`/debit/pin/${card.cardId}`}
            state={{ card }}
            className="btn btn-outline-dark w-100 py-3"
          >
            <i className="bi bi-key-fill"></i><br />Reset PIN
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link
            to={`/debit/activate/${card.cardId}`}
            state={{ card }}
            className="btn btn-outline-success w-100 py-3"
          >
            <i className="bi bi-credit-card-2-back"></i><br />Activate Card
          </Link>
        </div>
      </div>
    </div>
  );
}