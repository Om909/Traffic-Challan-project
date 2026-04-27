# 🚦 Traffic Challan System (MERN Stack)

A full-stack **Traffic Challan Management System** built using the **MERN Stack** for managing, searching, and paying traffic challans.

## Features

### 👮 Admin
- Admin Login with JWT Authentication
- Add New Challans
- View All Challans
- Dashboard Statistics:
  - Total Challans
  - Paid Challans
  - Pending Challans
- Search challans by vehicle number

---

### 👤 User
- User Signup & Login
- Search challans by vehicle number
- View personal challans
- Pay challans online (status update)

---

## Tech Stack

### Frontend
- React
- Bootstrap
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing

---

# Project Structure

```bash
traffic-challan-system/
│
├── backend/
│   ├── config/
│   │    └── db.js
│   │
│   ├── models/
│   │    ├── Admin.js
│   │    ├── User.js
│   │    └── Challan.js
│   │
│   ├── routes/
│   │    ├── admin.js
│   │    ├── user.js
│   │    └── challan.js
│   │
│   ├── seedAdmin.js
│   ├── seedChallans.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   └── src/
│       ├── pages/
│       │    ├── Home.js
│       │    ├── AdminLogin.js
│       │    ├── AdminPanel.js
│       │    ├── UserLogin.js
│       │    └── UserPanel.js
│       │
│       ├── App.js
│       └── config.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/traffic-challan-system.git
cd traffic-challan-system
```

---

# Backend Setup

## Install Dependencies

```bash
cd backend
npm install
```

Install packages:

```bash
npm install express mongoose dotenv cors bcrypt jsonwebtoken
```

---

## Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
npm start
```

Server runs at:

```bash
http://localhost:5000
```

---

# Seed Admin

Default admin:

```bash
Username: admin
Password: admin123
```

Run:

```bash
node seedAdmin.js
```

---

# Seed Sample Challans

```bash
node seedChallans.js
```

Sample seeded challans include:

- No Helmet
- Wrong Parking
- Over Speeding
- Signal Jump

---

# Frontend Setup

```bash
cd frontend
npm install
```

Install:

```bash
npm install react-router-dom bootstrap
```

---

## Configure API

In:

```js
src/config.js
```

Set:

```javascript
export const API = "http://localhost:5000";
```

---

## Run Frontend

```bash
npm start
```

Runs at:

```bash
http://localhost:3000
```

---

# API Routes

## Admin Routes

### Login
```http
POST /admin/login
```

---

## User Routes

### Signup
```http
POST /user/signup
```

### Login
```http
POST /user/login
```

---

## Challan Routes

### Add Challan (Admin)
```http
POST /challan/add
```

---

### Get All Challans
```http
GET /challan/all
```

---

### Search By Vehicle
```http
GET /challan/vehicle/:vehicleNumber
```

---

### User Challans
```http
GET /challan/user/:id
```

---

### Pay Challan
```http
POST /challan/pay/:id
```

---

# Sample Admin Login

```json
{
 "username":"admin",
 "password":"admin123"
}
```

---

# Sample Add Challan

```json
{
 "vehicleNumber":"JH01AB1234",
 "cause":"No Helmet",
 "fine":1000,
 "address":"Main Road, Ranchi",
 "dueDate":"2025-11-21"
}
```

---

# Authentication

Uses JWT Tokens:

```http
Authorization: Bearer <token>
```

Protected routes:
- Add challan
- View all challans
- Admin panel routes

---

# Security Features
- Password hashing with bcrypt
- JWT authentication
- Role-based admin access
- Protected routes
- Vehicle number normalization
- Input validation

---

# Future Improvements
- Online payment gateway integration
- Challan PDF receipt download
- Email/SMS notifications
- Pagination for challans
- User profile dashboard
- Role-based police officer login
- React Router navigation
- Deployment on Render/Vercel

---

# Demo Credentials

## Admin
```bash
Username: admin
Password: admin123
```

## Sample Vehicle Search
```bash
JH01AB1234
MH12XY9999
DL05MK4321
```

---

# Screens
- Home Search Page
- Admin Login
- Admin Dashboard
- User Login
- User Challan Panel

---

# Scripts

Backend:

```bash
npm start
node seedAdmin.js
node seedChallans.js
```

Frontend:

```bash
npm start
```

---

## Author
Developed using MERN Stack 🚀

---

## License
MIT License
