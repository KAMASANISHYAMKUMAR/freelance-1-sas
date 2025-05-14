# Smart Attendance System

A modern web application for managing attendance using facial recognition technology.

## Features

- **Facial Recognition**: Advanced facial recognition for accurate attendance tracking
- **Role-Based Access**: Different interfaces for admins, staff, and students
- **Real-time Analytics**: View attendance statistics and reports
- **User Management**: Admin panel for managing users and permissions
- **Profile Management**: Users can manage their profiles and view their attendance history
- **Secure Authentication**: JWT-based authentication with role-based route guards

## Tech Stack

### Frontend
- Angular (v17)
- TypeScript
- Tailwind CSS
- Font Awesome for icons
- RxJS for reactive programming
- JWT for authentication

### Backend
- Spring Boot (Java) for user management and authentication
- Python service for face recognition
- MySQL database

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/smart-attendance-system.git
cd smart-attendance-system
```

2. Install dependencies
```bash
# Install dependencies with legacy peer dependencies flag to resolve compatibility issues
npm install --legacy-peer-deps
```

3. Initialize Tailwind CSS
```bash
npm run tailwind:init
```

4. Run the development server
```bash
npm start
```

5. Navigate to `http://localhost:4200/` in your browser

### Resolving Dependency Issues

If you encounter dependency issues, try using the following command:

```bash
npm install @angular/material@^17.0.0 tailwindcss postcss autoprefixer jwt-decode @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons --legacy-peer-deps
```

## Project Structure

```
src/
├── app/
│   ├── core/               # Core functionality (services, guards, models)
│   │   ├── guards/         # Route guards
│   │   ├── interceptors/   # HTTP interceptors
│   │   ├── models/         # Data models
│   │   └── services/       # Services
│   ├── features/           # Feature modules
│   │   ├── attendance/     # Attendance module
│   │   ├── auth/           # Authentication module
│   │   ├── dashboard/      # Dashboard module
│   │   ├── landing/        # Landing page
│   │   ├── profile/        # User profile module
│   │   └── user-management/# User management module
│   ├── app.component.ts    # Root component
│   ├── app.routes.ts       # Root routes
│   └── app.config.ts       # App configuration
├── assets/                 # Static assets
└── environments/           # Environment configurations
```

## API Endpoints

The application uses the following backend APIs:

### User Controller
- `GET /user` - Get user by email
- `PUT /user` - Update user by email
- `DELETE /user` - Delete user by email
- `POST /register` - Register a new user
- `POST /login` - Authenticate and return JWT token
- `GET /image` - Get face image by email
- `POST /image` - Upload face image
- `GET /` - Get all users

### Face Recognition Controller
- `POST /start-recognition` - Start the recognition service
- `POST /stop-recognition` - Stop the recognition service
- `POST /mark` - Mark attendance
- `GET /status` - Get recognition service status
- `GET /check` - Check if recognition is active

### Test Endpoint
- `GET /hello` - Test connectivity to the backend

## License

This project is licensed under the MIT License.

## Troubleshooting

If you encounter API connection errors:
1. Ensure the backend server is running at the URL specified in environment.ts
2. Check the browser console for error messages
3. Make sure your backend CORS configuration allows requests from http://localhost:4200
