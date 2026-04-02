# Pharmacy App

This project includes local MySQL-backed authentication for customer and admin accounts.

## Features

- customer signup and login
- admin signup and login
- OTP-based login for local development
- forgot-password OTP reset

## Local setup

1. Copy `.env.example` to `.env`.
2. Update the MySQL credentials in `.env` for your local machine.
3. Make sure your MySQL server is running.
4. Run `npm install`.
5. Run `npm run dev`.

The frontend runs on `http://localhost:5173` and the auth API runs on `http://localhost:4000`.

## Database

- The server auto-creates the `pharmacy_app` database if the configured MySQL user has permission.
- It also auto-creates the `users` and `auth_otps` tables on startup.
- You can also run the SQL manually from [server/schema.sql](/D:/AsusTufA15/4thSem/DBMS_Project/pharmacy-app/server/schema.sql).

## Notes

- OTP values are returned in API responses when `DEV_EXPOSE_OTP=true` so local testing works without SMS or email integration.
- Auth state is persisted in the browser with the issued JWT and user profile.
