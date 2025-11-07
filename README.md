# 📧 Professional Bulk Mail Application

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://bulk-mail-frontend-app.vercel.app)
[![Node.js](https://img.shields.io/badge/node-20.x-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-Atlas-green)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/deployment-Vercel-black)](https://vercel.com/)

A production-ready, enterprise-grade Full Stack MERN application for sending bulk emails with JWT authentication, real-time geolocation, email history tracking, and a Gmail-inspired user interface. Deployed on Vercel with serverless architecture and MongoDB Atlas integration.

## 🌟 Live Application

- **Frontend**: [https://bulk-mail-frontend-app.vercel.app](https://bulk-mail-frontend-app.vercel.app)
- **Backend API**: [https://bulk-mail-app-backend.vercel.app](https://bulk-mail-app-backend.vercel.app)

## ✨ Key Features

### 🔐 Security & Authentication
- JWT-based secure authentication system
- Protected routes with middleware validation
- Environment-based credential management
- CORS configuration for production deployment

### 📧 Email Management
- Send bulk emails to multiple recipients simultaneously
- Support for both plain text and HTML email content
- Real-time success/failure tracking per recipient
- Comprehensive email history with MongoDB persistence
- Gmail SMTP integration with app-specific passwords

### 🎨 Modern UI/UX
- Gmail-inspired clean, professional interface
- Full-width white background design
- Responsive layout optimized for all devices
- Real-time clock with timezone detection
- IP-based geolocation display (city, country, timezone)
- Professional navbar and footer with gradient styling
- Smooth transitions and hover effects

### 🚀 Production Features
- Vercel serverless deployment (separate frontend/backend)
- MongoDB connection pooling for serverless optimization
- Automatic deployment via GitHub integration
- Environment variable management via Vercel dashboard
- Production-ready error handling and logging

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **Vite 7.2.1** - Lightning-fast build tool
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Axios 1.13.2** - Promise-based HTTP client
- **React Router DOM 7.9.5** - Client-side routing
- **PostCSS & Autoprefixer** - CSS processing

### Backend
- **Node.js 20.x** - JavaScript runtime
- **Express 5.1.0** - Fast, minimal web framework
- **Nodemailer 7.0.10** - Email sending library
- **Mongoose 8.0.0** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Secure token authentication
- **dotenv 16.6.1** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Database & Deployment
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and CI/CD

### External APIs
- **ipapi.co** - Real-time IP geolocation service
- **Gmail SMTP** - Email delivery service

## 📦 Installation & Setup

### Prerequisites
- Node.js 20.x or higher
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password enabled
- Git for version control

### 1. Clone Repository
```bash
git clone https://github.com/Jenidevops/bulk-mail-app.git
cd bulk-mail-app
```

### 2. Backend Setup
```bash
# Install root dependencies
npm install

# Create backend environment file
cd backend
cp .env.example .env
```

**Edit `backend/.env` with your credentials:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bulkmail
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=3000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Create frontend environment file
echo "VITE_API_URL=http://localhost:3000" > .env
```

### 4. Run Application Locally

**Terminal 1 - Backend:**
```bash
cd backend
node index.js
# Server running on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:5173
```

## 🌐 API Documentation

### Authentication Endpoints

#### POST `/api/login`
Authenticate admin user and receive JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Email Endpoints

#### POST `/api/send-bulk-email`
Send bulk emails to multiple recipients (requires JWT authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request:**
```json
{
  "subject": "Welcome to Our Service",
  "text": "Hello, thank you for joining us!",
  "html": "<p>Hello, <strong>thank you</strong> for joining us!</p>",
  "recipients": ["user1@example.com", "user2@example.com"]
}
```

**Response:**
```json
{
  "message": "Bulk email sent successfully",
  "successCount": 2,
  "failedCount": 0,
  "results": [...]
}
```

#### GET `/api/email-history`
Retrieve all sent email history (requires JWT authentication).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "subject": "Welcome Email",
    "recipients": ["user@example.com"],
    "status": "sent",
    "createdAt": "2025-11-07T10:30:00Z"
  }
]
```

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

#### 1. Deploy Backend
```bash
cd backend
vercel --prod
```

**Environment Variables (Vercel Dashboard):**
- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`

#### 2. Deploy Frontend
```bash
cd frontend
vercel --prod
```

**Environment Variables (Vercel Dashboard):**
- `VITE_API_URL=https://your-backend-url.vercel.app`

### Important Deployment Notes
- Backend uses serverless functions with MongoDB connection pooling
- Frontend uses SPA routing configuration via `vercel.json`
- Automatic deployment on git push to main branch
- CORS configured for production URLs

## 📁 Project Structure

```
bulk-mail-app/
├── backend/
│   ├── models/
│   │   └── Email.js              # MongoDB email schema
│   ├── index.js                  # Express server with API routes
│   ├── vercel.json               # Vercel serverless config
│   ├── .env                      # Environment variables (gitignored)
│   └── .env.example              # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx         # Authentication component
│   │   │   ├── SendEmail.jsx     # Bulk email form
│   │   │   ├── EmailHistory.jsx  # Email history display
│   │   │   └── Footer.jsx        # Professional footer component
│   │   ├── App.jsx               # Main app with routing
│   │   ├── main.jsx              # React entry point
│   │   ├── config.js             # API URL configuration
│   │   └── index.css             # Global styles
│   ├── vercel.json               # SPA routing config
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS config
│   └── vite.config.js            # Vite build config
│
├── package.json                  # Root dependencies
├── .gitignore                    # Git ignore rules
└── README.md                     # Project documentation
```

## � Usage Guide

### 1. Access Application
Navigate to the deployed frontend URL or `http://localhost:5173`

### 2. Login
- Username: `admin`
- Password: `admin123`
- JWT token stored in localStorage

### 3. Send Bulk Email
- Click "Send Email" in navigation
- Enter subject line
- Compose email message (supports line breaks)
- Add recipient emails (comma-separated)
- Click "Send" button
- View real-time success/failure status

### 4. View History
- Click "History" in navigation
- See all sent emails with:
  - Subject and recipients
  - Send status (sent/failed)
  - Timestamp
  - Recipient count

### 5. Footer Features
- **Real-time Clock**: Updates every second with full date/time
- **Geolocation**: Displays city, country based on IP address
- **Timezone**: Shows current timezone (from API or browser)
- **Copyright**: Dynamic year with branding
- **Developer Credit**: Professional attribution

## 🔒 Security Best Practices

✅ **Implemented:**
- Environment variables for sensitive data
- `.env` files properly gitignored
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration for production
- Secure password storage recommendations

⚠️ **Recommendations:**
- Change default admin credentials immediately
- Use strong JWT secret (32+ characters)
- Enable Gmail 2FA and use App Passwords
- Regularly rotate credentials
- Monitor MongoDB Atlas access logs
- Implement rate limiting for production (optional)

## 🎨 UI/UX Highlights

### Design Philosophy
- **Gmail-Inspired**: Clean, professional interface familiar to users
- **White Background**: Full-width white canvas for distraction-free experience
- **Gradient Accents**: Blue gradient navbar and footer for visual hierarchy
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Compact Design**: Footer visible without scrolling, content expands as needed

### Color Scheme
- Primary: Blue (#2563eb to #1d4ed8 gradient)
- Background: Pure white (#ffffff)
- Text: Gray scale (#1f2937, #4b5563, #6b7280)
- Success: Green (#10b981)
- Error: Red (#ef4444)

### Typography
- Font Family: System font stack (San Francisco, Segoe UI, Roboto)
- Headings: Semibold (600)
- Body: Normal (400)
- Small Text: 0.875rem (14px)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (error handling)
- [ ] Send email to single recipient
- [ ] Send email to multiple recipients
- [ ] View email history
- [ ] Logout and redirect to login
- [ ] Footer displays correct location
- [ ] Footer clock updates in real-time
- [ ] Responsive design on mobile
- [ ] API endpoints respond correctly

### Test Email Accounts
Use temporary email services for testing:
- [Temp Mail](https://temp-mail.org/)
- [10 Minute Mail](https://10minutemail.com/)

## 📊 Performance Optimization

- **Serverless Architecture**: Scalable Vercel functions
- **MongoDB Connection Pooling**: Reuses database connections
- **Code Splitting**: Vite optimizes bundle size
- **Lazy Loading**: React Router lazy loads routes
- **Tailwind Purge**: Removes unused CSS in production
- **Image Optimization**: SVG icons for crisp rendering

## 🤝 Contributing

This is a personal portfolio project. For suggestions or issues:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer

**Jenidevops**
- GitHub: [@Jenidevops](https://github.com/Jenidevops)
- Email: jenidevops@gmail.com

## 🙏 Acknowledgments

- **MongoDB Atlas** - Cloud database hosting
- **Vercel** - Serverless deployment platform
- **Gmail SMTP** - Email delivery service
- **ipapi.co** - Geolocation API service
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: jenidevops@gmail.com

---

<div align="center">

**Built with ❤️ using MERN Stack**

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-brightgreen)](https://www.mongodb.com/mern-stack)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey)](https://expressjs.com/)

</div>
