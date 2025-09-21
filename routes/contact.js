// routes/contact.js
import express from "express";
import { createContact } from "../controllers/contact.js";
import { verifyToken } from "../routes/auth.js"; // JWT middleware

const router = express.Router();

// ==========================
// Routes
// ==========================

// POST /api/contact
// Protected route: User must be logged in
// Creates a contact message linked to the logged-in user's account
router.post("/", verifyToken, createContact);

// GET /api/contact
// Test route to confirm the API is mounted and working
// Accessible without JWT
router.get("/", (req, res) => {
  res.send("Contact API is alive 🚀");
});

export default router;
