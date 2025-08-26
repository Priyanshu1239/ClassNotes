// backend/api/index.js
import { app } from "../app.js";
import connectDB from "../db/db.js";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected (Vercel)");
  }

  // Pass the request to Express
  return app(req, res);
}
