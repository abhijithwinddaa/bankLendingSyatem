const db = require('./database');

console.log('=== CUSTOMERS ===');
db.all('SELECT * FROM customers', (err, rows) => {
  if (err) console.error(err);
  else console.table(rows);
  
  console.log('\n=== LOANS ===');
  db.all('SELECT * FROM loans', (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
    
    console.log('\n=== PAYMENTS ===');
    db.all('SELECT * FROM payments', (err, rows) => {
      if (err) console.error(err);
      else console.table(rows);
      process.exit(0);
    });
  });
});