import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './lib/connectDB.js';
import { app, server } from './lib/socket.js';
import authRoutes from './routes/authRoute.js';
import messageRoutes from './routes/messageRoute.js';
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});

