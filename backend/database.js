const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Customers table
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    customer_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Loans table
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    loan_id TEXT PRIMARY KEY,
    customer_id TEXT,
    principal_amount REAL NOT NULL,
    total_amount REAL NOT NULL,
    interest_rate REAL NOT NULL,
    loan_period_years INTEGER NOT NULL,
    monthly_emi REAL NOT NULL,
    status TEXT DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
  )`);

  // Payments table
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    payment_id TEXT PRIMARY KEY,
    loan_id TEXT,
    amount REAL NOT NULL,
    payment_type TEXT DEFAULT 'EMI',
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans (loan_id)
  )`);
});

module.exports = db;