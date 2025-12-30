User Management System
A full-stack user management application with JWT authentication and role-based access control (RBAC) for admin and regular users.

Live Demo
Frontend: https://user-management-system-blue-phi.vercel.app

Backend API: https://user-management-system-production-75f6.up.railway.app/api

Health Check: https://user-management-system-production-75f6.up.railway.app/api/health

Admin test account

Email: admin@example.com

Password: Admin@123

Features
User signup and login with JWT authentication
Password strength validation and secure hashing with bcrypt
User profile view and update (name, email, password)
Admin dashboard with paginated user list (10 per page)
Activate / deactivate users (admin only)
Role-based access (admin vs normal user)
Inactive user login prevention
CORS and environment-based configuration

Tech Stack

Backend
Node.js, Express.js
MongoDB Atlas (Mongoose)
JWT (jsonwebtoken), bcryptjs
express-validator

Frontend
React 18 + Vite
React Router DOM
Axios
React Toastify
Custom responsive CSS

Deployment
Backend: Railway
Frontend: Vercel
Database: MongoDB Atlas
Version control: Git + GitHub

Installation
1. Clone the repository

git clone https://github.com/Rakesh-Kumar-Meher/user-management-system.git
cd user-management-system

2. Backend setup

cd backend
npm install
cp .env.example .env

Edit backend/.env:

PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_generated_jwt_secret

Generate a strong secret:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

Create the admin user:

node scripts/createAdmin.js

Run backend:

npm run dev
# http://localhost:5000

3. Frontend setup
cd ../frontend
npm install
cp .env.example .env

Edit frontend/.env:
VITE_API_URL=http://localhost:5000/api

Run frontend:
npm run dev
# http://localhost:5173

Project Structure

user-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (login, signup, me)
│   │   └── userController.js     # User CRUD/profile logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── roleCheck.js          # RBAC (admin/user)
│   ├── models/
│   │   └── User.js               # User schema & roles
│   ├── routes/
│   │   ├── auth.js               # /api/auth routes
│   │   └── users.js              # /api/users routes
│   ├── scripts/
│   │   └── createAdmin.js        # Seed default admin
│   ├── tests/                    # (optional test files)
│   ├── .env.example
│   ├── package.json
│   └── server.js                 # Express app entry
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmDialog.jsx # Reusable confirm modal
│   │   │   ├── Loader.jsx        # Loading spinner
│   │   │   ├── Navbar.jsx        # Top navigation bar
│   │   │   └── ProtectedRoute.jsx# Route guard by auth/role
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state (user + token)
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx# Admin user management UI
│   │   │   ├── Login.jsx         # Login screen
│   │   │   ├── Signup.jsx        # Registration screen
│   │   │   └── UserProfile.jsx   # Profile & password change
│   │   ├── services/
│   │   │   └── api.js            # Axios instance & base URL
│   │   ├── App.css               # Global styles
│   │   ├── App.jsx               # Routes & layout
│   │   └── main.jsx              # React entry point
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── API-Documentation.md      # Detailed API reference
│   └── User-Management-API.postman_collection.json
│
└── README.md
API Overview
Base URLs:

Development: http://localhost:5000/api

Production: https://user-management-system-production-75f6.up.railway.app/api

All protected endpoints require a Bearer token:

Authorization: Bearer <your-jwt-token>
Main endpoints
Method	Endpoint	Access	Description
POST	/auth/signup	Public	Register new user
POST	/auth/login	Public	Login and get JWT
GET	/auth/me	Private	Current user info
POST	/auth/logout	Private	Client-side token clear
GET	/users	Admin	Paginated user list
GET	/users/profile	Private	Get own profile
PUT	/users/profile	Private	Update profile
PUT	/users/password	Private	Change password
PATCH	/users/:id/activate	Admin	Activate user
PATCH	/users/:id/deactivate	Admin	Deactivate user
Example login request:

text
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
For full details see docs/API-Documentation.md.

Deployment Notes
Backend (Railway)

Root directory: backend

Environment variables:

PORT=5000
NODE_ENV=production
MONGO_URI=<your_atlas_connection>
JWT_SECRET=<your_secret>
Frontend (Vercel)

Root directory: frontend

Environment variable:


VITE_API_URL=https://user-management-system-production-75f6.up.railway.app/api


Author
Name: Rakesh Kumar Meher

GitHub: https://github.com/Rakesh-Kumar-Meher

Email: rakeshmeher156@gmail.com