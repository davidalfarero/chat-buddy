import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './lib/connectDB.js';
import { app, server } from './lib/socket.js';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-domain.com",
];

app.use(cors({
  origin: (origin, callback) => {
    // Handle Postman, curl, and other no-origin tools
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS origin not allowed"));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDist));

  app.all(/^(?:.*)$/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}



server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
