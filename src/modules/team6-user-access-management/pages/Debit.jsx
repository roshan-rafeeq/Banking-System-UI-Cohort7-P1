import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Debit() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const customerId = "CUST123"; // Dummy customer ID

    axios.get(`https://singular-current-marten.ngrok-free.app/debit_card/cards/${customerId}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      console.log(res.data);
      const debitCards = res.data || [];
      setCards(debitCards);
    })
    .catch((err) => {
      console.error("Error fetching cards:", err);
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const card = cards[currentIndex] || {};

  return (
    <div style={{
      backgroundImage: 'url("https://media.istockphoto.com/id/1337357617/photo/blue-watercolor-border-on-white-background-gradient-texture-and-color-in-cloudy-sky-or-foggy.jpg?s=612x612&w=0&k=20&c=EcjVfcvveqoZHHr1VP_c7wQNFVStdVpcq_PlLN8JMDI=")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: "633px",
      width: "100%",
    }}>
      <div className="container mt-4">
        <h4 className="mb-4 text-black fw-bold text-uppercase">Debit Card Services</h4>

        <div className="card mb-4 p-4 position-relative text-white" style={{
          backgroundImage: 'url("data:image/jpeg;base64,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")',
          backgroundColor: "#004aad",
          borderRadius: "20px",
          height: "220px",
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}>
          <i className="bi bi-bank2 position-absolute" style={{
            top: "10px",
            right: "15px",
            fontSize: "1.8rem",
          }}></i>

          <h5 className="mb-3">Debit Card</h5>
          <p><strong>Card Number: </strong> 
  {card.cardNumber ? card.cardNumber.replace(/(.{4})/g, "$1 ").trim() : "---- ---- ---- ----"}
</p>

          <p><strong>CVV:</strong> {card.cvv || "---"}</p>
          <p><strong>Expiry Date: </strong> 
        {card.expiryDate ? new Date(card.expiryDate).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit"
         }) : "--/--"}
       </p>


          <p><strong></strong> {card.accountType || "--"}</p>
        </div>

        <div className="text-center mb-4">
          <button className="btn btn-outline-secondary me-3 px-4" onClick={handlePrev} disabled={cards.length <= 1}>PREVIOUS</button>
          <button className="btn btn-outline-secondary px-4" onClick={handleNext} disabled={cards.length <= 1}>NEXT</button>
        </div>

        <div className="row text-center g-3">
          <div className="col-6">
            <Link to={`/debit/activate/${card.cardId}`} state={{ card }} className="btn btn-outline-dark w-100 py-3">
              <i className="bi bi-credit-card-2-back fw-bold"></i><br />
              <strong>Activate Card</strong>
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/debit/limits/${card.cardId}`} state={{ card }} className="btn btn-outline-dark w-100 py-3">
              <i className="bi bi-sliders"></i><br />
              <strong>Manage Usage</strong>
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/debit/pin/${card.cardId}`} state={{ card }} className="btn btn-outline-dark w-100 py-3">
              <i className="bi bi-key-fill"></i><br />
              <strong>Reset PIN</strong>
            </Link>
          </div>
          <div className="col-6">
            <Link to={`/debit/block/${card.cardId}`} state={{ card }} className="btn btn-outline-dark w-100 py-3">
              <i className="bi bi-ban"></i><br />
              <strong>Block Card</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
