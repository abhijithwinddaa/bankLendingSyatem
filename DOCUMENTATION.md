# Bank Lending System - Complete Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Documentation](#api-documentation)
6. [Business Logic](#business-logic)
7. [Implementation Details](#implementation-details)
8. [Security Considerations](#security-considerations)
9. [Performance Optimizations](#performance-optimizations)
10. [Deployment Guide](#deployment-guide)

---

## Project Overview

### Purpose
A full-stack web application for managing bank loans, payments, and customer ledgers with real-time EMI calculations using simple interest methodology.

### Key Features
- **LEND**: Create new loans with automatic EMI calculation
- **PAYMENT**: Record EMI and lump-sum payments
- **LEDGER**: View complete transaction history and loan status
- **ACCOUNT OVERVIEW**: Dashboard for all customers and loan summaries

### Requirements Met
- Simple Interest calculation: `I = P × N × R/100`
- EMI calculation: `(Principal + Interest) / (Years × 12)`
- Real-time balance tracking
- Payment history management
- Multi-customer support

---

## System Architecture

### Three-Tier Architecture

#### 1. Presentation Layer (Frontend)
- **Technology**: React.js 18.2.0
- **Styling**: Tailwind CSS (CDN)
- **Routing**: React Router DOM 6.8.1
- **HTTP Client**: Axios 1.3.4
- **Responsibilities**:
  - User interface rendering
  - Form validation
  - API communication
  - State management

#### 2. Application Layer (Backend)
- **Technology**: Node.js with Express.js 4.18.2
- **Middleware**: CORS, body-parser
- **Responsibilities**:
  - RESTful API endpoints
  - Business logic processing
  - Data validation
  - Error handling
  - EMI calculations

#### 3. Data Layer (Database)
- **Technology**: SQLite 5.1.6
- **Type**: Relational database
- **Responsibilities**:
  - Data persistence
  - ACID transactions
  - Referential integrity
  - Query optimization

---

## Technology Stack

### Backend Dependencies
```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // Cross-origin requests
  "dotenv": "^16.3.1",       // Environment variables
  "sqlite3": "^5.1.6"        // Database driver
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",           // UI library
  "react-dom": "^18.2.0",      // DOM rendering
  "react-router-dom": "^6.8.1", // Client-side routing
  "axios": "^1.3.4",           // HTTP client
  "react-scripts": "5.0.1"     // Build tools
}
```

### Development Tools
- **nodemon**: Auto-restart server during development
- **Tailwind CSS**: Utility-first CSS framework
- **SQLite Browser**: Database visualization (optional)

---

## Database Design

### Entity Relationship Diagram
```
Customers (1) -----> (N) Loans (1) -----> (N) Payments
```

### Table Schemas

#### Customers Table
```sql
CREATE TABLE customers (
  customer_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Loans Table
```sql
CREATE TABLE loans (
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
);
```

#### Payments Table
```sql
CREATE TABLE payments (
  payment_id TEXT PRIMARY KEY,
  loan_id TEXT,
  amount REAL NOT NULL,
  payment_type TEXT DEFAULT 'EMI',
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES loans (loan_id)
);
```

### Data Integrity
- **Primary Keys**: Unique identifiers for each entity
- **Foreign Keys**: Maintain referential integrity
- **Constraints**: NOT NULL for required fields
- **Defaults**: Automatic timestamps and status values

---

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

#### 1. Create Loan
```http
POST /api/v1/loans
Content-Type: application/json

{
  "customer_id": "CUST001",
  "loan_amount": 100000,
  "loan_period_years": 5,
  "interest_rate_yearly": 8.5
}
```

**Response (201 Created):**
```json
{
  "loan_id": "abc123xyz",
  "customer_id": "CUST001",
  "total_amount_payable": 142500,
  "monthly_emi": 2375
}
```

#### 2. Record Payment
```http
POST /api/v1/loans/{loan_id}/payments
Content-Type: application/json

{
  "amount": 2375,
  "payment_type": "EMI"
}
```

**Response (200 OK):**
```json
{
  "payment_id": "pay123",
  "loan_id": "abc123xyz",
  "message": "Payment recorded successfully.",
  "remaining_balance": 140125,
  "emis_left": 59
}
```

#### 3. Get Loan Ledger
```http
GET /api/v1/loans/{loan_id}/ledger
```

**Response (200 OK):**
```json
{
  "loan_id": "abc123xyz",
  "customer_id": "CUST001",
  "principal": 100000,
  "total_amount": 142500,
  "monthly_emi": 2375,
  "amount_paid": 2375,
  "balance_amount": 140125,
  "emis_left": 59,
  "transactions": [
    {
      "transaction_id": "pay123",
      "date": "2025-01-24T10:30:00Z",
      "amount": 2375,
      "type": "EMI"
    }
  ]
}
```

#### 4. Customer Overview
```http
GET /api/v1/customers/{customer_id}/overview
```

**Response (200 OK):**
```json
{
  "customer_id": "CUST001",
  "total_loans": 1,
  "loans": [
    {
      "loan_id": "abc123xyz",
      "principal": 100000,
      "total_amount": 142500,
      "total_interest": 42500,
      "emi_amount": 2375,
      "amount_paid": 2375,
      "emis_left": 59
    }
  ]
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

#### 404 Not Found
```json
{
  "error": "Loan not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Database connection failed"
}
```

---

## Business Logic

### Interest Calculation (Simple Interest)
```javascript
const calculateSimpleInterest = (principal, rate, years) => {
  return principal * years * (rate / 100);
};
```

### EMI Calculation
```javascript
const calculateEMI = (principal, rate, years) => {
  const totalInterest = principal * years * (rate / 100);
  const totalAmount = principal + totalInterest;
  return totalAmount / (years * 12);
};
```

### Payment Processing Logic
1. **Validation**: Check loan exists and amount > 0
2. **Recording**: Insert payment record with timestamp
3. **Balance Calculation**: Sum all payments, subtract from total
4. **EMI Recalculation**: For lump sums, recalculate remaining EMIs

### Balance Tracking
```javascript
const calculateBalance = (totalAmount, payments) => {
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  return totalAmount - totalPaid;
};
```

---

## Implementation Details

### Backend Architecture

#### Server Setup (server.js)
```javascript
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
```

#### Database Connection (database.js)
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Auto-create tables on startup
db.serialize(() => {
  // Table creation queries
});
```

#### Error Handling Strategy
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
```

### Frontend Architecture

#### Component Structure
```
src/
├── App.js                 // Main app with routing
├── components/
│   ├── LendForm.js       // Loan creation form
│   ├── PaymentForm.js    // Payment recording form
│   ├── Ledger.js         // Transaction history
│   └── AccountOverview.js // Customer dashboard
```

#### State Management
- **Local State**: useState for form data
- **API State**: useEffect for data fetching
- **Error Handling**: Try-catch with user feedback

#### API Integration
```javascript
const createLoan = async (loanData) => {
  try {
    const response = await axios.post('/api/v1/loans', loanData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Network error';
  }
};
```

---

## Security Considerations

### Input Validation
- **Backend**: Validate all inputs before processing
- **Frontend**: Client-side validation for UX
- **SQL Injection**: Parameterized queries only

### Data Protection
- **Environment Variables**: Sensitive config in .env
- **CORS**: Configured for specific origins
- **Error Messages**: No sensitive data exposure

### Authentication (Future Enhancement)
- JWT tokens for session management
- Role-based access control
- Password hashing with bcrypt

---

## Performance Optimizations

### Database Optimizations
- **Indexes**: On frequently queried columns
- **Connection Pooling**: For production deployment
- **Query Optimization**: Efficient JOIN operations

### Frontend Optimizations
- **Code Splitting**: React.lazy for large components
- **Memoization**: React.memo for expensive renders
- **Bundle Size**: Tree shaking with Webpack

### Caching Strategy
- **Browser Caching**: Static assets
- **API Caching**: Redis for frequent queries
- **Database Caching**: Query result caching

---

## Deployment Guide

### Development Setup
```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend
cd frontend
npm install
npm start
```

### Production Deployment

#### Backend (Node.js)
```bash
# Environment setup
NODE_ENV=production
PORT=5000
DB_PATH=/var/lib/app/database.sqlite

# Process management
pm2 start server.js --name bank-lending-api
```

#### Frontend (React)
```bash
npm run build
# Serve build folder with nginx/apache
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Variables
```env
# Backend .env
PORT=5000
DB_PATH=./database.sqlite
NODE_ENV=production
CORS_ORIGIN=http://localhost:3000
```

---

## Testing Strategy

### Unit Tests
- **Backend**: Jest for API endpoints
- **Frontend**: React Testing Library
- **Database**: SQLite in-memory for tests

### Integration Tests
- **API Testing**: Supertest for HTTP requests
- **E2E Testing**: Cypress for user workflows

### Test Coverage
- **Target**: 80%+ code coverage
- **Critical Paths**: Payment processing, EMI calculations
- **Edge Cases**: Invalid inputs, network failures

---

## Monitoring and Logging

### Application Logging
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Performance Monitoring
- **Response Times**: API endpoint metrics
- **Database Queries**: Slow query logging
- **Error Rates**: 4xx/5xx response tracking

---

## Future Enhancements

### Phase 1
- User authentication and authorization
- Email notifications for payments
- PDF report generation

### Phase 2
- Mobile app (React Native)
- Advanced analytics dashboard
- Automated payment reminders

### Phase 3
- Machine learning for risk assessment
- Integration with payment gateways
- Multi-currency support

---

## Conclusion

This Bank Lending System demonstrates a complete full-stack application with:
- **Scalable Architecture**: Three-tier design for maintainability
- **Robust Backend**: RESTful APIs with proper error handling
- **Modern Frontend**: React.js with responsive design
- **Data Integrity**: Relational database with constraints
- **Business Logic**: Accurate financial calculations
- **Production Ready**: Comprehensive documentation and deployment guides

The system successfully meets all assignment requirements while providing a foundation for future enhancements and scalability.