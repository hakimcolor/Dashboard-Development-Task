# Task Management Dashboard

A modern, responsive React dashboard application with authentication and data visualization.

## 🚀 Features

- **Secure Authentication**: JWT token-based login system
- **Protected Routes**: Dashboard accessible only after login
- **Real-time Data**: Fetches and displays data from REST API
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful animations and transitions with Vanta.js background
- **User Management**: Display user information and statistics
- **Analytics Dashboard**: Overview of users, revenue, and growth metrics

## 🛠️ Technologies Used

- **React** - Frontend framework
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Vanta.js** - Animated 3D backgrounds
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd myapp
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

Use these credentials to login:

- **Email**: user1@example.com
- **Password**: password123

## 📁 Project Structure

```
src/
├── Context/
│   ├── AuthContext.jsx      # Authentication context
│   └── AuthProvider.jsx     # Authentication provider with JWT
├── Pages/
│   ├── Singin.jsx           # Login page
│   └── Dashboard.jsx        # Main dashboard page
├── Router/
│   ├── Router.jsx           # Route configuration
│   └── PriveteRouter.jsx    # Protected route wrapper
├── Root/
│   └── Root.jsx             # Root layout component
├── index.css                # Global styles and animations
└── main.jsx                 # Application entry point
```

## 🌐 API Endpoints

The application uses the following REST API:

**Base URL**: `https://task-api-eight-flax.vercel.app`

- `POST /api/login` - User authentication
- `GET /api/dashboard` - Dashboard data (users, analytics, products)
- `GET /api/users` - User list
- `GET /api/analytics` - Analytics data
- `GET /api/products` - Product list

## ✨ Key Features Implementation

### Authentication

- JWT token-based authentication
- Persistent login using localStorage
- Protected routes with automatic redirect
- Secure logout functionality

### Dashboard

- Real-time data fetching from API
- Statistics cards with growth indicators
- Recent users table with status badges
- Top products display
- Responsive sidebar navigation
- Mobile-friendly hamburger menu

### Design

- Modern gradient backgrounds
- Smooth animations and transitions
- Vanta.js 3D wave background
- Clean, professional UI
- Accessible color scheme

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🎨 Design Reference

Design inspired by: [Task Management Dashboard on Dribbble](https://dribbble.com/shots/25241984-Task-Management-Dashboard)

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The build files will be in the `dist` directory, ready for deployment.

## 📝 License

This project is created as part of a frontend internship task.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- Design inspiration from Dribbble
- REST API provided by the task requirements
- Vanta.js for beautiful backgrounds
