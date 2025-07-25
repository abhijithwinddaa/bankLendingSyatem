import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LendForm from './components/LendForm';
import PaymentForm from './components/PaymentForm';
import Ledger from './components/Ledger';
import AccountOverview from './components/AccountOverview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Bank Lending System</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Overview</Link>
              <Link to="/lend" className="hover:underline">New Loan</Link>
              <Link to="/payment" className="hover:underline">Payment</Link>
              <Link to="/ledger" className="hover:underline">Ledger</Link>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<AccountOverview />} />
            <Route path="/lend" element={<LendForm />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/ledger" element={<Ledger />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;