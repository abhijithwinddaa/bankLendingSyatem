import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [formData, setFormData] = useState({
    loan_id: '',
    amount: '',
    payment_type: 'EMI'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/v1/loans/${formData.loan_id}/payments`, {
        amount: parseFloat(formData.amount),
        payment_type: formData.payment_type
      });
      setMessage('Payment recorded successfully!');
      setFormData({ loan_id: '', amount: '', payment_type: 'EMI' });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error recording payment');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Record Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan ID</label>
          <input
            type="text"
            value={formData.loan_id}
            onChange={(e) => setFormData({...formData, loan_id: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Type</label>
          <select
            value={formData.payment_type}
            onChange={(e) => setFormData({...formData, payment_type: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="EMI">EMI</option>
            <option value="LUMP_SUM">Lump Sum</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Payment Amount (₹)</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Record Payment
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}

export default PaymentForm;