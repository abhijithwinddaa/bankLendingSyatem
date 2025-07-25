@echo off
echo Setting up Bank Lending System...

echo Installing backend dependencies...
cd backend
call npm install
echo Backend dependencies installed.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
echo Frontend dependencies installed.

echo Seeding database...
cd ..\backend
call npm run seed

echo Setup complete!
echo.
echo To start the application:
echo 1. Run "npm run dev" in the backend folder
echo 2. Run "npm start" in the frontend folder
pause