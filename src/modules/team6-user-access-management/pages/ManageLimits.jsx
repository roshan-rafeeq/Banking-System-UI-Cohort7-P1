import { useState } from 'react';

export default function ManageUsage() {
  const [posEnabled, setPosEnabled] = useState(true);
  const [ecomEnabled, setEcomEnabled] = useState(true);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [atmLimit, setAtmLimit] = useState(200000);
  const [posLimit, setPosLimit] = useState(500000);

  const handleSave = () => {
    alert(`Saved:
    POS: ${posEnabled}, E-Com: ${ecomEnabled}, NFC: ${nfcEnabled}
    ATM Limit: ₹${atmLimit}
    POS+E-Com Limit: ₹${posLimit}`);
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-4">My Debit Cards</h5>

      {/* Transaction Toggles */}
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={posEnabled}
          onChange={() => setPosEnabled(!posEnabled)}
          id="posSwitch"
        />
        <label className="form-check-label" htmlFor="posSwitch">Domestic Usage</label>
      </div>

      
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={posEnabled}
          onChange={() => setPosEnabled(!posEnabled)}
          id="domesticSwitch"
        />
        <label className="form-check-label" htmlFor="domesticSwitch">International Usage</label>
      </div>
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={posEnabled}
          onChange={() => setPosEnabled(!posEnabled)}
          id="domesticSwitch"
        />
        <label className="form-check-label" htmlFor="domesticSwitch">ATM Transactions</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={ecomEnabled}
          onChange={() => setEcomEnabled(!ecomEnabled)}
          id="ecomSwitch"
        />
        <label className="form-check-label" htmlFor="ecomSwitch">POS Transactions</label>
      </div>

      <div className="form-check form-switch mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          checked={nfcEnabled}
          onChange={() => setNfcEnabled(!nfcEnabled)}
          id="nfcSwitch"
        />
        <label className="form-check-label" htmlFor="nfcSwitch">Ecommerce Transaction</label>
      </div>
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={ecomEnabled}
          onChange={() => setEcomEnabled(!ecomEnabled)}
          id="ecomSwitch"
        />
        <label className="form-check-label" htmlFor="ecomSwitch">Contactless Transactions</label>
      </div>


      {/* Limits Section */}
      <h6 className="text-muted mt-4">Manage Limits</h6>
      <p style={{ fontSize: '0.9rem' }}>
        Set limit will be applicable to Domestic and International usage.<br />
        Limits to be set in multiple of 1000.
      </p>

      {/* ATM Limit Slider */}
      <div className="mb-4">
        <label className="form-label fw-bold">ATM Transactions</label>
        <input
          type="range"
          min="1000"
          max="200000"
          step="1000"
          value={atmLimit}
          onChange={(e) => setAtmLimit(Number(e.target.value))}
          className="form-range"
        />
        <div className="d-flex justify-content-between">
          <span>₹ 1,000</span>
          <span><strong>New Limit:</strong> ₹ {atmLimit.toLocaleString()}</span>
          <span>₹ 2,00,000</span>
        </div>
      </div>

      {/* POS + E-Com Limit Slider */}
      <div className="mb-4">
        <label className="form-label fw-bold">POS (Merchant) & E-Commerce Transactions</label>
        <input
          type="range"
          min="1000"
          max="500000"
          step="1000"
          value={posLimit}
          onChange={(e) => setPosLimit(Number(e.target.value))}
          className="form-range"
        />
        <div className="d-flex justify-content-between">
          <span>₹ 1,000</span>
          <span><strong>New Limit:</strong> ₹ {posLimit.toLocaleString()}</span>
          <span>₹ 5,00,000</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary px-5" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
