# User Management System

A full-stack web application for managing users with role-based access control (RBAC), JWT authentication, and comprehensive user lifecycle management.

> **Status:** 🚧 In Development | **Submission:** Backend Developer Intern Assessment - Purple Merit Technologies

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)

## ✨ Features

### Authentication & Authorization
- ✅ User signup with email validation
- ✅ Secure login with JWT tokens
- ✅ Password strength validation (min 8 chars, uppercase, lowercase, number)
- ✅ Token-based session management
- ✅ Logout functionality
- ✅ Role-based access control (Admin/User)

### User Management
- ✅ View and edit own profile
- ✅ Change password with current password verification
- ✅ Update email and full name
- ✅ Profile information display

### Admin Features
- ✅ View all users with pagination (10 users per page)
- ✅ Activate user accounts
- ✅ Deactivate user accounts
- ✅ Admin-only access control
- ✅ Prevent admin account deactivation

### Security Features
- ✅ Password hashing with bcrypt
- ✅ JWT authentication with 7-day expiry
- ✅ Protected routes with middleware
- ✅ Role-based authorization
- ✅ Input validation on all endpoints
- ✅ CORS configuration
- ✅ Environment variables for sensitive data
- ✅ Inactive account login prevention

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Testing:** Jest + Supertest

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **UI Notifications:** React Toastify
- **Styling:** Custom CSS (Responsive)

### DevOps & Deployment
- **Backend Hosting:** Railway
- **Frontend Hosting:** Vercel
- **Database:** MongoDB Atlas
- **Version Control:** Git + GitHub

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)
- Git

### Clone Repository

git clone https://github.com/YOUR_USERNAME/user-management-system.git
cd user-management-system

### Backend Setup

1. **Navigate to backend directory:**
cd backend

2. **Install dependencies:**
npm install

3. **Create environment file:**
cp .env.example .env

4. **Configure environment variables:**

Edit `backend/.env` with your values:
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_generated_jwt_secret

5. **Generate secure JWT secret:**
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

Copy the output and paste it as `JWT_SECRET` in `.env`

6. **Create admin user:**
node scripts/createAdmin.js

Default admin credentials:
- Email: `admin@example.com`
- Password: `Admin@123`

7. **Start development server:**
npm run dev

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
cd ../frontend

2. **Install dependencies:**
npm install

3. **Create environment file:**
cp .env.example .env


4. **Configure environment variables:**

Edit `frontend/.env`:
VITE_API_URL=http://localhost:5000/api


5. **Start development server:**
npm run dev

Frontend will run on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

## 📁 Project Structure

user-management-system/
├── backend/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Authentication logic
│ │ └── userController.js # User management logic
│ ├── middleware/
│ │ ├── auth.js # JWT verification
│ │ └── roleCheck.js # Role-based authorization
│ ├── models/
│ │ └── User.js # User schema
│ ├── routes/
│ │ ├── auth.js # Auth endpoints
│ │ └── users.js # User endpoints
│ ├── scripts/
│ │ └── createAdmin.js # Admin user creation
│ ├── tests/
│ │ └── auth.test.js # Authentication tests
│ ├── .env.example # Environment template
│ ├── .gitignore
│ ├── package.json
│ └── server.js # Entry point
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ConfirmDialog.jsx # Confirmation modal
│ │ │ ├── Loader.jsx # Loading spinner
│ │ │ ├── Navbar.jsx # Navigation bar
│ │ │ └── ProtectedRoute.jsx # Route guard
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Auth state management
│ │ ├── pages/
│ │ │ ├── AdminDashboard.jsx # Admin panel
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Signup.jsx # Signup page
│ │ │ └── UserProfile.jsx # User profile
│ │ ├── services/
│ │ │ └── api.js # Axios configuration
│ │ ├── App.css # Global styles
│ │ ├── App.jsx # Main app component
│ │ └── main.jsx # Entry point
│ ├── .env.example
│ ├── .gitignore
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── docs/ # (Will be created)
│ ├── API-Documentation.md
│ └── User-Management-API.postman_collection.json
│
├── .gitignore
└── README.md


## 📚 API Documentation

### Base URLs

- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend.railway.app/api` (after deployment)

### Authentication

All protected endpoints require Bearer token:

Authorization: Bearer <your-jwt-token>


### Endpoints Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/signup` | Public | Register new user |
| POST | `/auth/login` | Public | User login |
| GET | `/auth/me` | Private | Get current user |
| POST | `/auth/logout` | Private | User logout |
| GET | `/users` | Admin | Get all users (paginated) |
| GET | `/users/profile` | Private | Get user profile |
| PUT | `/users/profile` | Private | Update profile |
| PUT | `/users/password` | Private | Change password |
| PATCH | `/users/:id/activate` | Admin | Activate user |
| PATCH | `/users/:id/deactivate` | Admin | Deactivate user |

### Example Requests

#### User Signup
POST /api/auth/signup
Content-Type: application/json

{
"fullName": "John Doe",
"email": "john@example.com",
"password": "Test@1234"
}


#### User Login
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "Test@1234"
}

**Full API documentation will be available in:** `docs/API-Documentation.md`

## 🌍 Deployment

### Backend (Railway)

1. Sign up at [Railway.app](https://railway.app)
2. Create new project from GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGO_URI=<your_atlas_connection>`
   - `JWT_SECRET=<your_secret>`
5. Deploy

### Frontend (Vercel)

1. Sign up at [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.railway.app/api`
5. Deploy

## 🧪 Testing

### Run Backend Tests

cd backend
npm test

### Run Tests with Coverage

npm run test:coverage

### Test Results
- ✅ 15+ unit tests implemented
- ✅ Authentication endpoint coverage
- ✅ User management endpoint coverage
- ✅ Role-based access control tests
- ✅ Error handling tests

## 🔐 Default Credentials

### Admin Account
After running `createAdmin.js`:
- **Email:** admin@example.com
- **Password:** Admin@123

⚠️ **Important:** Change these credentials in production!

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Role-based access control (RBAC)
- Input validation on all endpoints
- CORS configuration
- Environment variable protection
- Inactive account login prevention
- Admin account deactivation prevention

## 🎨 UI Features

- Responsive design (mobile & desktop)
- Loading spinners for async operations
- Toast notifications for user feedback
- Confirmation dialogs for critical actions
- Form validation with error messages
- Clean and intuitive interface
- Role-based navigation

## 🚀 Development

### Backend Development Mode
cd backend
npm run dev

### Frontend Development Mode
cd frontend
npm run dev


### Build for Production

**Backend:**
npm start

**Frontend:**
npm run build
npm run preview


## 📝 Environment Variables

### Backend (`backend/.env`)
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_64_character_secret_key


### Frontend (`frontend/.env`)
VITE_API_URL=http://localhost:5000/api

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
- Ensure database user has proper permissions

### JWT Token Issues
- Verify JWT_SECRET is set in backend .env
- Check token expiration (default: 7 days)
- Clear localStorage if using old tokens

### CORS Issues
- Verify CORS is enabled in server.js
- Check frontend URL is allowed in CORS config

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is created for educational and assessment purposes.

## 👤 Author

- Name: Rakesh Kumar Meher
- GitHub: https://github.com/Rakesh-Kumar-Meher
- Email: rakeshmeher156@gmail.com

