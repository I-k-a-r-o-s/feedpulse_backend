# FeedPulse Backend

Node.js Express backend server for FeedPulse feedback management system with MongoDB and Gemini AI.

## Features

- RESTful API endpoints for feedback submission and admin operations
- JWT-based authentication for admin routes
- MongoDB integration with Mongoose ODM
- Google Gemini API integration for AI-powered feedback analysis
- CORS support for frontend communication
- Input validation and error handling
- Secure password hashing with Bcrypt

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Google Gemini API** - AI integration
- **Nodemon** - Development auto-reload

## How to Run Locally

### 1: Clone the Repository
```bash
git clone <repository-url>
cd (folder name)
```

### 2. Install Dependencies
```bash
npm install/ npm i
```

### 3. Create Environment Variables
Create a `.env` file in the backend root directory:
```env
PORT= port number
MONGO_URI= mongodb+srv://<username>:<password>@<cluster>.mongodb.net/feedpulse
ADMIN_EMAIL= email
ADMIN_PASSWORD= password
JWT_SECRET= jwt secret
GEMINI_API_KEY= your gemini api key
NODE_ENV= development(change to production on production)
CORS_ORIGIN= fronted base URL
```

### 3. Start the Server

**Development mode**:
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## API 

### Admin Routes (`/api/auth`)
- **POST** `/api/auth/register` - Admin register
- **POST** `/api/auth/login` - Admin login
- **POST** `/api/auth/logout` - Admin logout

### Feedback Routes (`/api/feedback`)
- **POST** `/api/feedback/submit` - Submit new feedback
- **GET** `/api/feedback` - Get all feedback (Protected)
- **GET** `/api/feedback/:id` - Get feedback by ID (Protected)
- **DELETE** `/api/feedback/:id` - Delete feedback (Protected)

## Authentication

This backend uses JWT (JSON Web Tokens) for authentication:

1. Admin logs in via `/api/auth/login` with email and password
2. Server returns a JWT token via cookies
3. Protected routes verify the JWT token in the authorization header
4. Token is stored in HTTP-only cookies for security
