import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ManageUsage() {
  const { cardId } = useParams();
  const { state } = useLocation();
  const card = state?.card;

  // API URL
  const apiBase = `https://your-backend-url/cards/limits/${cardId}`;

  // Toggle states
  const [domesticEnabled, setDomesticEnabled] = useState(true);
  const [internationalEnabled, setInternationalEnabled] = useState(true);
  const [atmEnabled, setAtmEnabled] = useState(true);
  const [posEnabled, setPosEnabled] = useState(true);
  const [ecomEnabled, setEcomEnabled] = useState(true);
  const [contactlessEnabled, setContactlessEnabled] = useState(false);

  // Limit states
  const [atmLimit, setAtmLimit] = useState(200000);
  const [posLimit, setPosLimit] = useState(500000);

  // Common update handler
  const updateBackend = (field, value) => {
    axios
      .put(apiBase, { [field]: value })
      .then(() => console.log(`Updated ${field} to`, value))
      .catch(() => alert(`Failed to update ${field}`));
  };

  // Toggle handlers
  const toggleHandler = (field, valueSetter, value) => {
    valueSetter(!value);
    updateBackend(field, !value);
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">Manage Usage for Card: {card?.cardNumber}</h5>

      {/* Toggles */}
      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="domesticSwitch"
          checked={domesticEnabled} onChange={() => toggleHandler('domesticEnabled', setDomesticEnabled, domesticEnabled)} />
        <label className="form-check-label" htmlFor="domesticSwitch">Domestic Usage</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="internationalSwitch"
          checked={internationalEnabled} onChange={() => toggleHandler('internationalEnabled', setInternationalEnabled, internationalEnabled)} />
        <label className="form-check-label" htmlFor="internationalSwitch">International Usage</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="atmSwitch"
          checked={atmEnabled} onChange={() => toggleHandler('atmEnabled', setAtmEnabled, atmEnabled)} />
        <label className="form-check-label" htmlFor="atmSwitch">ATM Transactions</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="posSwitch"
          checked={posEnabled} onChange={() => toggleHandler('posEnabled', setPosEnabled, posEnabled)} />
        <label className="form-check-label" htmlFor="posSwitch">POS Transactions</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input className="form-check-input" type="checkbox" id="ecomSwitch"
          checked={ecomEnabled} onChange={() => toggleHandler('ecomEnabled', setEcomEnabled, ecomEnabled)} />
        <label className="form-check-label" htmlFor="ecomSwitch">E-Commerce Transactions</label>
      </div>

      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" id="contactlessSwitch"
          checked={contactlessEnabled} onChange={() => toggleHandler('contactlessEnabled', setContactlessEnabled, contactlessEnabled)} />
        <label className="form-check-label" htmlFor="contactlessSwitch">Contactless Transactions</label>
      </div>

      {/* Limits */}
      <h6 className="text-muted mt-4">Manage Limits</h6>
      <p style={{ fontSize: '0.9rem' }}>
        Set limit will be applicable to Domestic and International usage.<br />
        Limits to be set in multiple of 1000.
      </p>

      <div className="mb-4">
        <label className="form-label fw-bold">ATM Transactions</label>
        <input type="range" min="1000" max="200000" step="1000"
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
        <input type="range" min="1000" max="500000" step="1000"
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
