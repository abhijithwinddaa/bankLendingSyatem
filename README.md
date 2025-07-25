# Bank Lending System

A full-stack web application for managing bank loans, payments, and customer ledgers.

## Tech Stack

- **Frontend:** React.js, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, SQLite
- **Database:** SQLite with simple table structure

## Features

- **LEND:** Create new loans with EMI calculation
- **PAYMENT:** Record lump-sum payments against loans
- **LEDGER:** View complete transaction history for customers
- **ACCOUNT OVERVIEW:** Dashboard showing all customers and loan summaries

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with sample data:
   ```bash
   npm run seed
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `POST /lend` - Create a new loan
- `POST /payment` - Record a payment
- `GET /ledger/:customerName` - Get customer ledger
- `GET /account-overview` - Get all customers overview

## Database Schema

### customers
- id (PRIMARY KEY)
- name (UNIQUE)
- created_at

### loans
- id (PRIMARY KEY)
- customer_id (FOREIGN KEY)
- principal
- interest_rate
- duration_years
- emi
- total_amount
- created_at

### payments
- id (PRIMARY KEY)
- loan_id (FOREIGN KEY)
- amount
- emi_number
- payment_date

## Usage

1. Start both backend and frontend servers
2. Visit `http://localhost:3000`
3. Use the navigation to:
   - Create new loans
   - Record payments
   - View customer ledgers
   - See account overview

## Sample Data

The seed script creates sample customers with loans. Run `npm run seed` in the backend directory to populate the database.