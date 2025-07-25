import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AccountOverview() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/account-overview');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Overview</h2>
      
      {customers.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">No customers found. Create a new loan to get started.</p>
          <p className="text-sm text-gray-500 mt-2">Note: Use Loan ID (not Customer ID) in the Ledger section</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-3">{customer.name}</h3>
              <p className="text-xs text-blue-600 mb-2">Loan ID: {customer.loanId}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Principal:</span>
                  <span className="font-medium">₹{customer.principal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">EMI:</span>
                  <span className="font-medium">₹{customer.emi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">₹{customer.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid:</span>
                  <span className="font-medium text-green-600">₹{customer.totalPaid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium text-red-600">₹{customer.balance}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Created: {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountOverview;