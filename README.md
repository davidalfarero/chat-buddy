# Chat Buddy - Real-Time Chat Application

**Live Demo:** [https://chat-app-ke5h.onrender.com](https://chat-app-ke5h.onrender.com)

## 📌 Overview

**Chat Buddy** is a full-stack real-time chat application built with the MERN stack. It supports user authentication (with email verification), real-time messaging using Socket.IO, typing indicators, theme switching (30+ themes via DaisyUI), and persistent chat history via MongoDB.

Designed to showcase best practices in full-stack development, this project is also a valuable portfolio piece.

---

## 🚀 Tech Stack

### Frontend

- **React** + **Vite**
- **TailwindCSS** + **DaisyUI** (for UI themes)
- **Axios**
- **Zustand** (state management)

### Backend

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **Socket.IO** (real-time chat)
- **JWT** for authentication
- **Brevo (formerly Sendinblue)** for email verification/reset
- **Cloudinary** for file/image handling (optional/future add-on)

---

## ✨ Features

- ✅ User Sign-up, Login, and Logout
- ✅ Email Verification (Brevo integration)
- ✅ Password Reset with email token
- ✅ Real-time Chat with WebSocket (Socket.IO)
- ✅ Typing Indicators
- ✅ Responsive UI with Dark/Light and 30+ Themes
- ✅ Protected Routes (Frontend + Backend)
- ✅ Zustand for global state management
- ✅ MongoDB for storing users and chat messages
- ✅ Deployed on **Render** (Backend + Frontend)

---

## 📂 Project Structure

```
chat-app/
├── client/               # Frontend (React + Vite)
│   └── dist/             # Production build output
├── server/              # Backend (Express)
│   ├── src/
│   │   ├── routes/      # Auth and message routes
│   │   ├── lib/         # DB connection, socket setup
│   │   └── server.js    # Main server entry point
│   └── .env             # Environment variables
├── package.json         # Root-level scripts
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/davidalfarero/chat-buddy.git
cd chat-buddy
```

### 2. Install dependencies

```bash
npm install
npm run install-all    # Installs both client and server deps
```

### 3. Setup environment variables

Create `.env` files for both client and server:

#### `/server/.env`

```
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
BREVO_API_KEY=your_brevo_key
CLIENT_URL=https://chat-app-ke5h.onrender.com
```

#### `/client/.env`

```
VITE_API_URL=https://chat-app-ke5h.onrender.com/api
```

### 4. Build frontend

```bash
cd client
npm run build
```

### 5. Start the server

```bash
cd ../server
node src/server.js
```

---

## 📦 Deployment

- App is deployed to **Render** (both client and server).
- MongoDB is hosted on **MongoDB Atlas**.
- Email services are handled via **Brevo**.

---

## 🔐 Authentication Flow

- New users receive a verification email via Brevo.
- Tokens are generated with JWT.
- Expired or invalid tokens are handled securely.
- Reset Password flow uses secure token with expiration.

---

## 📈 Future Improvements

- ✅ Add group chats
- ✅ Add user profile customization
- ✅ Improve message formatting (emojis, timestamps)
- ✅ Improve mobile UX

---

## 🙌 Acknowledgements

This project is inspired by learning from open-source communities, and real-world developer workflows. Special thanks to all contributors and mentors who shared best practices.

---

## 🧠 Author

**David [@davidalfarero](https://github.com/davidalfarero)**  
Frontend & Backend Developer

Portfolio: [myportfolio.com](https://react-portfolio-nine-rust.vercel.app/)  
Email: [david.alfarero@gmail.com](mailto:david.alfarero@gmail.com)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with 💬 by David - Chat Buddy: Where Conversations Begin.
