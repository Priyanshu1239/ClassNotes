# ClassNotes - Full Stack Application

A comprehensive full-stack application for managing class notes with a React frontend and Node.js/Express backend.

## 🚀 Features

- **User Authentication**: Login and signup functionality
- **Notes Management**: Upload, view, and manage class notes
- **File Upload**: Support for PDF and document uploads
- **Search Functionality**: Search through uploaded notes
- **Dashboard**: User-friendly interface for managing content

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Modern React Hooks and Context API
- Responsive design

### Backend
- Node.js with Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- File upload handling with Multer
- Cloudinary integration for file storage

## 📁 Project Structure

```
ClassNotes/
├── backend/          # Node.js/Express backend
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── utils/        # Utility functions
└── frontend/         # React frontend
    └── ClassNotes/
        ├── src/
        │   ├── components/  # Reusable components
        │   ├── pages/       # Page components
        │   ├── context/     # React context
        │   └── assets/      # Static assets
        └── public/          # Public files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Priyanshu1239/ClassNotes.git
cd ClassNotes
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend/ClassNotes
npm install
```

4. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add necessary configuration (database URL, JWT secret, etc.)

5. Start the development servers:
   - Backend: `npm run dev` (from backend directory)
   - Frontend: `npm run dev` (from frontend/ClassNotes directory)

## 📝 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Upload new note
- `GET /api/notes/:id` - Get specific note
- `DELETE /api/notes/:id` - Delete note

## 🔧 Configuration

### Backend Environment Variables
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Frontend Environment Variables
```
VITE_API_BASE_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Responsive design for all devices
- Secure authentication system
- Efficient file handling and storage
