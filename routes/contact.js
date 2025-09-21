import express from "express";

import { createContact } from "../controllers/contact.js";
import { verifyToken } from "../routes/auth.js";

const router = express.Router();

// POST /api/contact

router.post("/", verifyToken, createContact);

export default router;
