// src/pages/Debit.jsx
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from '../../../components/Navbar';

export default function Debit() {
  return (
    <div className="container mt-4">
      <h4 className="mb-4">Debit Card Services</h4>

      <div className="row text-center">
        <div className="col-6 mb-3">
          <Link to="/debit/block" className="btn btn-outline-danger w-100 py-3">
            <i className="bi bi-ban"></i><br />Block Card
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link to="/debit/limits" className="btn btn-outline-primary w-100 py-3">
            <i className="bi bi-sliders"></i><br />Manage Card Usage
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link to="/debit/pin" className="btn btn-outline-dark w-100 py-3">
            <i className="bi bi-key-fill"></i><br />Set ATM PIN
          </Link>
        </div>
        <div className="col-6 mb-3">
          <Link to="/debit/activate" className="btn btn-outline-success w-100 py-3">
            <i className="bi bi-credit-card-2-back"></i><br />Activate Card
          </Link>
        </div>
      </div>
    </div>
  );
}
