import { useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../../context/AuthContext';

export default function ManageUsage() {
  const { customerId } = useContext(AuthContext);
  const { cardId } = useParams();
  const { state } = useLocation();
  const card = state?.card;

  // ✅ Group B Backend URL
  const apiBase = `https://your-group-b-backend-url.com/api/cards/limits/${cardId}`;

  // States
  const [domesticEnabled, setDomesticEnabled] = useState(true);
  const [internationalEnabled, setInternationalEnabled] = useState(true);
  const [atmEnabled, setAtmEnabled] = useState(true);
  const [posEnabled, setPosEnabled] = useState(true);
  const [ecomEnabled, setEcomEnabled] = useState(true);
  const [contactlessEnabled, setContactlessEnabled] = useState(false);
  const [atmLimit, setAtmLimit] = useState(200000);
  const [posLimit, setPosLimit] = useState(500000);

  // Backend update
  const updateBackend = (field, value) => {
    axios
      .put(apiBase, {
        customerId, // ✅ Send customerId to your own backend
        [field]: value,
      })
      .then(() => console.log(`Updated ${field} to`, value))
      .catch(() => alert(`Failed to update ${field}`));
  };

  const toggleHandler = (field, setter, current) => {
    const newValue = !current;
    setter(newValue);
    updateBackend(field, newValue);
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Manage Usage for Card: {card?.cardNumber || cardId}</h5>

      {/* Toggles */}
      {[
        ["Domestic Usage", domesticEnabled, setDomesticEnabled, "domesticEnabled"],
        ["International Usage", internationalEnabled, setInternationalEnabled, "internationalEnabled"],
        ["ATM Transactions", atmEnabled, setAtmEnabled, "atmEnabled"],
        ["POS Transactions", posEnabled, setPosEnabled, "posEnabled"],
        ["E-Commerce Transactions", ecomEnabled, setEcomEnabled, "ecomEnabled"],
        ["Contactless Transactions", contactlessEnabled, setContactlessEnabled, "contactlessEnabled"],
      ].map(([label, value, setter, key]) => (
        <div className="form-check form-switch mb-3" key={key}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={value}
            onChange={() => toggleHandler(key, setter, value)}
          />
          <label className="form-check-label">{label}</label>
        </div>
      ))}

      {/* Limits */}
      <h6 className="text-muted mt-4">Manage Limits</h6>
      <p style={{ fontSize: '0.9rem' }}>
        Set limit will be applicable to Domestic and International usage.<br />
        Limits to be set in multiples of 1000.
      </p>

      <div className="mb-4">
        <label className="form-label fw-bold">ATM Transactions</label>
        <input
          type="range"
          min="1000"
          max="200000"
          step="1000"
          value={atmLimit}
          onChange={(e) => {
            const value = Number(e.target.value);
            setAtmLimit(value);
            updateBackend('atmLimit', value);
          }}
          className="form-range"
        />
        <div className="d-flex justify-content-between">
          <span>₹ 1,000</span>
          <span><strong>New Limit:</strong> ₹ {atmLimit.toLocaleString()}</span>
          <span>₹ 2,00,000</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">POS & E-Commerce Transactions</label>
        <input
          type="range"
          min="1000"
          max="500000"
          step="1000"
          value={posLimit}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPosLimit(value);
            updateBackend('posLimit', value);
          }}
          className="form-range"
        />
        <div className="d-flex justify-content-between">
          <span>₹ 1,000</span>
          <span><strong>New Limit:</strong> ₹ {posLimit.toLocaleString()}</span>
          <span>₹ 5,00,000</span>
        </div>
      </div>
    </div>
  );
}
