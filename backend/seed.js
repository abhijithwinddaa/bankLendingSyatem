const db = require('./database');

// Sample data
const sampleData = [
  { customer_id: 'CUST001', name: 'John Doe', principal: 100000, interestRate: 8.5, years: 5 },
  { customer_id: 'CUST002', name: 'Jane Smith', principal: 50000, interestRate: 7.2, years: 3 },
  { customer_id: 'CUST003', name: 'Bob Johnson', principal: 200000, interestRate: 9.1, years: 10 }
];

const calculateEMI = (principal, rate, years) => {
  const totalInterest = principal * years * (rate / 100);
  const totalAmount = principal + totalInterest;
  return totalAmount / (years * 12);
};

const generateId = () => Math.random().toString(36).substr(2, 9);

console.log('Seeding database...');

sampleData.forEach((data, index) => {
  const emi = calculateEMI(data.principal, data.interestRate, data.years);
  const totalAmount = emi * data.years * 12;
  const loanId = generateId();
  
  db.run('INSERT OR REPLACE INTO customers (customer_id, name) VALUES (?, ?)', [data.customer_id, data.name], function() {
    db.run(`INSERT OR REPLACE INTO loans (loan_id, customer_id, principal_amount, interest_rate, loan_period_years, monthly_emi, total_amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
           [loanId, data.customer_id, data.principal, data.interestRate, data.years, emi, totalAmount], 
           function(err) {
      if (err) {
        console.error('Error creating loan:', err);
        return;
      }
      
      // Add sample payments
      if (index === 0) { // John Doe gets some payments
        db.run('INSERT INTO payments (payment_id, loan_id, amount, payment_type) VALUES (?, ?, ?, ?)', 
               [generateId(), loanId, emi, 'EMI']);
        db.run('INSERT INTO payments (payment_id, loan_id, amount, payment_type) VALUES (?, ?, ?, ?)', 
               [generateId(), loanId, emi, 'EMI']);
      }
      
      console.log(`Created loan for ${data.name}`);
    });
  });
});

setTimeout(() => {
  console.log('Database seeded successfully!');
  process.exit(0);
}, 1000);