# Donezo - Task Management App

A modern, full-stack task management application built with React, TypeScript, and Express. Stay organized and productive with an intuitive interface and robust backend.

## 🚀 Features

- ✅ **Create & Manage Tasks** - Add, edit, and delete tasks with ease
- 🎨 **Theme Toggle** - Switch between light and dark modes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔐 **Secure Authentication** - JWT-based user authentication
- 🎯 **Organized Layout** - Sidebar navigation for better organization
- ⚡ **Fast & Modern** - Built with React + Vite for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Donezo
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3. Setup Frontend
```bash
cd ../client
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd client
npm run dev
```
The app will open at `http://localhost:5173`

### Build for Production
```bash
cd client
npm run build
```

## 📁 Project Structure

```
Donezo/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Static assets
│   │   └── App.jsx        # Main app component
│   └── vite.config.ts     # Vite configuration
│
└── server/                # Express backend
    ├── src/
    │   ├── controllers/   # Route handlers
    │   ├── routes/        # API routes
    │   ├── db/            # Database configuration
    │   └── middlewares/   # Express middlewares
    └── package.json
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/todo` - Get all tasks
- `POST /api/todo` - Create new task
- `PUT /api/todo/:id` - Update task
- `DELETE /api/todo/:id` - Delete task

## 📝 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start the server

## 🤝 Contributing

Contributions are welcome! Feel free to open issues.

## 📄 License

ISC License
