import React, { useState } from 'react';
import axios from 'axios';

function LendForm() {
  const [formData, setFormData] = useState({
    customer_id: '',
    loan_amount: '',
    interest_rate_yearly: '',
    loan_period_years: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/loans', {
        customer_id: formData.customer_id,
        loan_amount: parseFloat(formData.loan_amount),
        interest_rate_yearly: parseFloat(formData.interest_rate_yearly),
        loan_period_years: parseInt(formData.loan_period_years)
      });
      setMessage(`Loan created! EMI: ₹${response.data.monthly_emi}`);
      setFormData({ customer_id: '', loan_amount: '', interest_rate_yearly: '', loan_period_years: '' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error creating loan');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer ID</label>
          <input
            type="text"
            value={formData.customer_id}
            onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount (₹)</label>
          <input
            type="number"
            value={formData.loan_amount}
            onChange={(e) => setFormData({...formData, loan_amount: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate Yearly (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.interest_rate_yearly}
            onChange={(e) => setFormData({...formData, interest_rate_yearly: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Period (Years)</label>
          <input
            type="number"
            value={formData.loan_period_years}
            onChange={(e) => setFormData({...formData, loan_period_years: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Create Loan
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}

export default LendForm;