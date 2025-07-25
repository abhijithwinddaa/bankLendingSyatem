require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to calculate EMI using Simple Interest
const calculateEMI = (principal, rate, years) => {
  const totalInterest = principal * years * (rate / 100);
  const totalAmount = principal + totalInterest;
  return totalAmount / (years * 12);
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// POST /api/v1/loans - Create new loan
app.post('/api/v1/loans', (req, res) => {
  const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
  
  if (!customer_id || !loan_amount || !loan_period_years || !interest_rate_yearly) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emi = calculateEMI(loan_amount, interest_rate_yearly, loan_period_years);
  const totalAmount = emi * loan_period_years * 12;
  const loanId = generateId();

  // Insert or get customer
  db.run('INSERT OR IGNORE INTO customers (customer_id, name) VALUES (?, ?)', [customer_id, customer_id], function() {
    // Create loan
    db.run(`INSERT INTO loans (loan_id, customer_id, principal_amount, interest_rate, loan_period_years, monthly_emi, total_amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
           [loanId, customer_id, loan_amount, interest_rate_yearly, loan_period_years, emi, totalAmount], 
           function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ 
        loan_id: loanId,
        customer_id: customer_id,
        total_amount_payable: Math.round(totalAmount * 100) / 100,
        monthly_emi: Math.round(emi * 100) / 100
      });
    });
  });
});

// POST /api/v1/loans/{loan_id}/payments - Add payment
app.post('/api/v1/loans/:loan_id/payments', (req, res) => {
  const { loan_id } = req.params;
  const { amount, payment_type = 'EMI' } = req.body;
  
  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  db.get('SELECT * FROM loans WHERE loan_id = ?', [loan_id], (err, loan) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    const paymentId = generateId();
    db.run('INSERT INTO payments (payment_id, loan_id, amount, payment_type) VALUES (?, ?, ?, ?)', 
           [paymentId, loan_id, amount, payment_type], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      // Calculate remaining balance
      db.get('SELECT COALESCE(SUM(amount), 0) as total_paid FROM payments WHERE loan_id = ?', 
             [loan_id], (err, result) => {
        const remainingBalance = loan.total_amount - result.total_paid;
        const emisLeft = Math.ceil(remainingBalance / loan.monthly_emi);
        
        res.json({ 
          payment_id: paymentId,
          loan_id: loan_id,
          message: 'Payment recorded successfully.',
          remaining_balance: Math.round(remainingBalance * 100) / 100,
          emis_left: Math.max(0, emisLeft)
        });
      });
    });
  });
});

// GET /api/v1/loans/{loan_id}/ledger - Get loan ledger
app.get('/api/v1/loans/:loan_id/ledger', (req, res) => {
  const { loan_id } = req.params;
  
  db.get('SELECT * FROM loans WHERE loan_id = ?', [loan_id], (err, loan) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    db.all('SELECT * FROM payments WHERE loan_id = ? ORDER BY payment_date', 
           [loan_id], (err, payments) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const balance = loan.total_amount - totalPaid;
      const totalEmis = loan.loan_period_years * 12;
      
      const transactions = payments.map(p => ({
        transaction_id: p.payment_id,
        date: p.payment_date,
        amount: p.amount,
        type: p.payment_type
      }));
      
      res.json({
        loan_id: loan.loan_id,
        customer_id: loan.customer_id,
        principal: loan.principal_amount,
        total_amount: loan.total_amount,
        monthly_emi: loan.monthly_emi,
        amount_paid: Math.round(totalPaid * 100) / 100,
        balance_amount: Math.round(balance * 100) / 100,
        emis_left: Math.max(0, Math.ceil(balance / loan.monthly_emi)),
        transactions
      });
    });
  });
});

// GET /api/v1/customers/{customer_id}/overview - Get customer overview
app.get('/api/v1/customers/:customer_id/overview', (req, res) => {
  const { customer_id } = req.params;
  
  db.all(`SELECT l.*, COALESCE(SUM(p.amount), 0) as total_paid
          FROM loans l
          LEFT JOIN payments p ON l.loan_id = p.loan_id
          WHERE l.customer_id = ?
          GROUP BY l.loan_id
          ORDER BY l.created_at DESC`, [customer_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Customer not found or has no loans' });
    
    const loans = rows.map(row => ({
      loan_id: row.loan_id,
      principal: row.principal_amount,
      total_amount: row.total_amount,
      total_interest: row.total_amount - row.principal_amount,
      emi_amount: row.monthly_emi,
      amount_paid: Math.round(row.total_paid * 100) / 100,
      emis_left: Math.max(0, Math.ceil((row.total_amount - row.total_paid) / row.monthly_emi))
    }));
    
    res.json({
      customer_id,
      total_loans: loans.length,
      loans
    });
  });
});

// GET /api/v1/customers/{customer_id}/loans - Get customer loans
app.get('/api/v1/customers/:customer_id/loans', (req, res) => {
  const { customer_id } = req.params;
  
  db.all('SELECT loan_id, principal_amount, monthly_emi, created_at FROM loans WHERE customer_id = ?', 
         [customer_id], (err, loans) => {
    if (err) return res.status(500).json({ error: err.message });
    if (loans.length === 0) return res.status(404).json({ error: 'No loans found for customer' });
    
    res.json({ customer_id, loans });
  });
});

// GET /account-overview - Get all customers (for frontend compatibility)
app.get('/account-overview', (req, res) => {
  db.all(`SELECT c.customer_id, l.loan_id, l.principal_amount, l.monthly_emi, l.total_amount, l.created_at,
                 COALESCE(SUM(p.amount), 0) as total_paid
          FROM customers c
          LEFT JOIN loans l ON c.customer_id = l.customer_id
          LEFT JOIN payments p ON l.loan_id = p.loan_id
          GROUP BY c.customer_id, l.loan_id
          ORDER BY l.created_at DESC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const customers = rows.map(row => ({
      name: row.customer_id,
      loanId: row.loan_id,
      principal: row.principal_amount,
      emi: Math.round(row.monthly_emi * 100) / 100,
      totalAmount: Math.round(row.total_amount * 100) / 100,
      totalPaid: Math.round(row.total_paid * 100) / 100,
      balance: Math.round((row.total_amount - row.total_paid) * 100) / 100,
      createdAt: row.created_at
    }));
    
    res.json(customers);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});