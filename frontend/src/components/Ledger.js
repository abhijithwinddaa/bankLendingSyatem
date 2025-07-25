import React, { useState } from 'react';
import axios from 'axios';

function Ledger() {
  const [loanId, setLoanId] = useState('');
  const [ledgerData, setLedgerData] = useState(null);
  const [error, setError] = useState('');

  const fetchLedger = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/v1/loans/${loanId}/ledger`);
      setLedgerData(response.data);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Error fetching ledger');
      setLedgerData(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Loan Ledger</h2>
      
      <form onSubmit={fetchLedger} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter loan ID"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            className="flex-1 p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Get Ledger
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {ledgerData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Loan Summary for {ledgerData.customer_id}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-600">Principal</p>
              <p className="text-lg font-bold">₹{ledgerData.principal}</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-lg font-bold">₹{ledgerData.amount_paid}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-lg font-bold">₹{ledgerData.balance_amount}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">EMIs Remaining</p>
              <p className="text-lg font-bold">{ledgerData.emis_left}</p>
            </div>
          </div>

          <h4 className="text-lg font-bold mb-3">Payment History</h4>
          {ledgerData.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Transaction ID</th>
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-left">Amount</th>
                    <th className="border p-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="border p-2">{transaction.transaction_id}</td>
                      <td className="border p-2">{transaction.type}</td>
                      <td className="border p-2">₹{transaction.amount}</td>
                      <td className="border p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No payments recorded yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Ledger;