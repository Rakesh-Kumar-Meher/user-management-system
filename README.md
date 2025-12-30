# User Management System

A full-stack web application for managing users with JWT authentication and role-based access control (RBAC). Admin users can manage all accounts while regular users can maintain their own profiles [file:1].

## 🌐 Live Deployment

- **Frontend:** https://user-management-system-blue-phi.vercel.app
- **Backend API:** https://user-management-system-production-75f6.up.railway.app/api
- **Health Check:** https://user-management-system-production-75f6.up.railway.app/api/health

**Test Credentials:** Email: `admin@example.com` | Password: `Admin@123`

---

## 📖 Project Overview

This User Management System allows administrators to view, activate, and deactivate user accounts with pagination support (10 users per page). Regular users can sign up, log in, view their profile, update their information, and change passwords [file:1]. The application uses JWT tokens for secure authentication, bcrypt for password hashing, and implements role-based authorization to restrict admin features. All routes are protected and validate user permissions before granting access [file:1].

---

## 🛠️ Tech Stack

**Backend:** Node.js v18+, Express.js v4.18, MongoDB Atlas (Mongoose v7.5), JWT (jsonwebtoken v9.0), bcryptjs v2.4, express-validator v7.0

**Frontend:** React 18, Vite, React Router DOM v6, Axios, React Toastify, Custom CSS

**Deployment:** Backend on Railway, Frontend on Vercel, Database on MongoDB Atlas

**Development Tools:** Git, GitHub, Postman, VS Code

---

## 📦 Installation & Local Setup

### Prerequisites

Install Node.js v18 or higher, npm or yarn, and create a free MongoDB Atlas account.

### Step 1: Clone Repository
git clone https://github.com/Rakesh-Kumar-Meher/user-management-system.git
cd user-management-system

### Step 2: Backend Setup

Navigate to backend folder, install dependencies, and create environment file:

cd backend
npm install
cp .env.example .env

Open `backend/.env` and add these values (replace with your actual credentials):

PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/User_Management
JWT_SECRET=your-generated-secret-key-here

Generate a secure JWT secret by running: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` and paste the output as JWT_SECRET value [file:1]. Create the default admin user by running: `node scripts/createAdmin.js` which creates admin@example.com with password Admin@123. Start the backend server: `npm run dev` and it will run on http://localhost:5000.

### Step 3: Frontend Setup

Open a new terminal, navigate to frontend folder, install dependencies, and create environment file:

cd frontend
npm install
cp .env.example .env

Open `frontend/.env` and add:

VITE_API_URL=http://localhost:5000/api

Start the frontend server: `npm run dev` and it will run on http://localhost:5173. Open your browser to http://localhost:5173 and login with admin@example.com / Admin@123.

---

## 📁 Project Structure

user-management-system/
├── backend/
│ ├── config/db.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Signup, login, logout logic
│ │ └── userController.js # Profile, user management logic
│ ├── middleware/
│ │ ├── auth.js # JWT token verification
│ │ └── roleCheck.js # Admin/user role authorization
│ ├── models/User.js # User schema with roles
│ ├── routes/
│ │ ├── auth.js # /api/auth routes
│ │ └── users.js # /api/users routes
│ ├── scripts/createAdmin.js # Admin user creation script
│ ├── tests/auth.test.js # Unit tests
│ ├── .env.example # Environment template
│ ├── package.json
│ └── server.js # Express app entry
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ConfirmDialog.jsx # Confirmation modal
│ │ │ ├── Loader.jsx # Loading spinner
│ │ │ ├── Navbar.jsx # Navigation bar
│ │ │ └── ProtectedRoute.jsx# Route protection by role
│ │ ├── context/AuthContext.jsx # Global auth state
│ │ ├── pages/
│ │ │ ├── AdminDashboard.jsx # Admin user management
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Signup.jsx # Registration page
│ │ │ └── UserProfile.jsx # Profile management
│ │ ├── services/api.js # Axios instance
│ │ ├── App.jsx # Main app with routes
│ │ └── main.jsx # React entry
│ ├── .env.example
│ ├── package.json
│ └── vite.config.js
└── README.md


---

## 🔐 Environment Variables

### Backend (.env)

- `PORT` - Server port number (default: 5000)
- `NODE_ENV` - Environment mode (development or production)
- `MONGO_URI` - MongoDB Atlas connection string (include database name)
- `JWT_SECRET` - Secret key for JWT token signing (use 64+ character random string)

### Frontend (.env)

- `VITE_API_URL` - Backend API base URL (http://localhost:5000/api for local, production URL for deployed)

**Important:** Never commit .env files to GitHub. They are excluded via .gitignore [file:1].

---

## 🚀 Deployment Instructions

### Backend Deployment (Railway)

Sign up at Railway.app, create new project, connect your GitHub repository, set root directory to `backend`, add environment variables (PORT=5000, NODE_ENV=production, MONGO_URI=your-atlas-uri, JWT_SECRET=your-secret), and Railway automatically deploys when you push to GitHub [file:1]. The backend URL will be https://your-project.up.railway.app.

### Frontend Deployment (Vercel)

Sign up at Vercel.com, import your GitHub repository, set root directory to `frontend`, add environment variable VITE_API_URL=https://your-railway-backend.up.railway.app/api (use your actual Railway URL), and click Deploy [file:1]. Vercel provides a URL like https://your-project.vercel.app. 

### Database (MongoDB Atlas)

Create a free cluster at MongoDB.com/cloud/atlas, create a database user with password, whitelist all IP addresses (0.0.0.0/0) for deployment, get the connection string from "Connect" > "Connect your application", and use it as MONGO_URI in your backend environment variables [file:1].

---

## 📚 API Documentation

**Base URL:** `https://user-management-system-production-75f6.up.railway.app/api` (Production) or `http://localhost:5000/api` (Development)

**Authentication:** All protected endpoints require Bearer token in Authorization header: `Authorization: Bearer <your-jwt-token>` [file:1]

### Endpoints

**1. User Signup** - `POST /auth/signup` (Public) - Request body: `{"fullName": "John Doe", "email": "john@example.com", "password": "Test@1234"}` - Response 201: `{"success": true, "token": "jwt-token-here", "user": {"id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "user", "status": "active"}}` [file:1]

**2. User Login** - `POST /auth/login` (Public) - Request body: `{"email": "admin@example.com", "password": "Admin@123"}` - Response 200: `{"success": true, "token": "jwt-token-here", "user": {"id": "...", "fullName": "System Administrator", "email": "admin@example.com", "role": "admin"}}` [file:1]

**3. Get Current User** - `GET /auth/me` (Private) - Headers: `Authorization: Bearer <token>` - Response 200: `{"success": true, "user": {"_id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "user", "status": "active"}}` [file:1]

**4. Logout** - `POST /auth/logout` (Private) - Headers: `Authorization: Bearer <token>` - Response 200: `{"success": true, "message": "Logged out successfully"}` (Token is cleared on client side) [file:1]

**5. Get All Users** - `GET /users?page=1` (Admin Only) - Headers: `Authorization: Bearer <admin-token>` - Query params: page (optional, default 1) - Response 200: `{"success": true, "users": [array of user objects], "pagination": {"currentPage": 1, "totalPages": 3, "totalUsers": 25, "usersPerPage": 10}}` [file:1]

**6. Get User Profile** - `GET /users/profile` (Private) - Headers: `Authorization: Bearer <token>` - Response 200: `{"success": true, "user": {"_id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "user", "status": "active"}}` [file:1]

**7. Update Profile** - `PUT /users/profile` (Private) - Headers: `Authorization: Bearer <token>` - Request body: `{"fullName": "John Updated", "email": "john.updated@example.com"}` - Response 200: `{"success": true, "message": "Profile updated successfully", "user": {"id": "...", "fullName": "John Updated", "email": "john.updated@example.com"}}` [file:1]

**8. Change Password** - `PUT /users/password` (Private) - Headers: `Authorization: Bearer <token>` - Request body: `{"currentPassword": "Test@1234", "newPassword": "NewTest@1234"}` - Response 200: `{"success": true, "message": "Password changed successfully"}` [file:1]

**9. Activate User** - `PATCH /users/:id/activate` (Admin Only) - Headers: `Authorization: Bearer <admin-token>` - URL param: id (user ID) - Response 200: `{"success": true, "message": "User activated successfully"}` [file:1]

**10. Deactivate User** - `PATCH /users/:id/deactivate` (Admin Only) - Headers: `Authorization: Bearer <admin-token>` - URL param: id (user ID) - Response 200: `{"success": true, "message": "User deactivated successfully"}` - Note: Admin users cannot deactivate themselves [file:1]

### Error Responses

- **400 Bad Request:** `{"success": false, "message": "Validation error or bad input"}` - Returned for invalid email format, weak passwords, duplicate emails, or missing required fields [file:1]
- **401 Unauthorized:** `{"success": false, "message": "No authentication token, access denied"}` - Returned when JWT token is missing, invalid, or expired [file:1]
- **403 Forbidden:** `{"success": false, "message": "Access denied. Insufficient permissions"}` - Returned when a regular user tries to access admin-only endpoints [file:1]
- **404 Not Found:** `{"success": false, "message": "User not found"}` - Returned when requested user ID doesn't exist [file:1]
- **500 Server Error:** `{"success": false, "message": "Server error"}` - Returned for unexpected server-side errors [file:1]

---

## ✅ Features Implemented

- User signup with email/password validation and automatic JWT token generation [file:1]
- User login with credential verification and inactive account prevention [file:1]
- Password hashing using bcrypt (10 salt rounds) for security [file:1]
- JWT authentication with 7-day token expiration [file:1]
- Protected routes with authentication middleware [file:1]
- Role-based access control (admin/user roles) [file:1]
- User profile view and update (full name, email) [file:1]
- Secure password change requiring current password verification [file:1]
- Admin dashboard with paginated user list (10 users per page) [file:1]
- Admin user activation/deactivation with admin account protection [file:1]
- Responsive design for mobile and desktop views [file:1]
- Input validation on all API endpoints [file:1]
- CORS configuration for secure cross-origin requests [file:1]
- Environment variables for sensitive credentials [file:1]
- Loading spinners and toast notifications for better UX [file:1]
- Confirmation dialogs for critical actions [file:1]
- Proper HTTP status codes and consistent error response format [file:1]

---

## 🐛 Troubleshooting

**MongoDB connection fails:** Verify your MONGO_URI is correct, check MongoDB Atlas network access allows all IPs (0.0.0.0/0), and ensure database user has read/write permissions.

**Login fails with "Invalid credentials":** Run `node scripts/createAdmin.js` in backend folder to create admin user, or verify password is exactly `Admin@123` (case-sensitive).

**Frontend shows "Network Error":** Check VITE_API_URL in frontend/.env matches your backend URL, ensure backend server is running on specified port, and verify CORS is enabled in server.js.

**Token expired errors:** JWT tokens expire after 7 days. Clear localStorage in browser DevTools (Application > Local Storage) and login again.

**Admin dashboard shows 404:** Verify you're logged in as admin user (admin@example.com), check token is valid and not expired, and ensure roleCheck middleware is properly configured.

---

## 👤 Author

**Name:** Rakesh Kumar Meher  
**GitHub:** https://github.com/Rakesh-Kumar-Meher  
**Email:** rakeshmeher156@gmail.com

---