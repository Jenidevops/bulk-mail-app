# 📧 Bulk Mail Application

A Full Stack MERN application for sending bulk emails with authentication, email history, and MongoDB integration.

## 🚀 Features

- ✅ Send bulk emails to multiple recipients
- ✅ Email history tracking in MongoDB
- ✅ Admin authentication with JWT
- ✅ Beautiful UI with React + Tailwind CSS
- ✅ Real-time success/failure status
- ✅ Responsive design

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express
- Nodemailer
- MongoDB + Mongoose
- JWT Authentication

## 📦 Installation

### 1. Install MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Create .env file in backend directory
cp backend/.env.example backend/.env

# Edit backend/.env with your credentials

# Start backend server
node backend/index.js
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
# MongoDB Configuration
MONGODB_URI=your-mongodb-connection-string

# JWT Secret
JWT_SECRET=your-secret-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin Credentials
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password

# Server Configuration
PORT=3000
```

**Important:** 
- Never commit the `.env` file to version control
- For Gmail: Enable 2FA and create an App Password in your Gmail settings
- Change default admin credentials before deployment

## 🌐 API Endpoints

- `POST /api/login` - Admin login
- `POST /api/send-bulk-email` - Send bulk emails
- `GET /api/email-history` - Get email history
- `GET /test-email` - Test email endpoint

## 📱 Usage

1. Open http://localhost:5173 in your browser
2. Login with admin credentials
3. Navigate to "Send Email" page
4. Fill in subject, body, and recipient emails (comma-separated)
5. Click "Send Bulk Email"
6. Check "History" page to see sent emails

## 🎯 Project Structure

```
bulkmail/
├── backend/
│   ├── models/
│   │   └── Email.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SendEmail.jsx
│   │   │   ├── EmailHistory.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── package.json
```

## ✨ Made with MERN Stack
