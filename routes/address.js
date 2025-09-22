import express from "express";
import Address from "../models/Address.js";
import { verifyToken } from "../routes/auth.js"; // JWT middleware

// Save new Address
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      fullName,
      line1,
      line2,
      contactNumber,
      pincode,
      country,
      accountNumber,
      userId,
    } = req.body;

    // ensure accountNumber is provided
    if (!accountNumber) {
      return res.status(400).json({ message: "Account Number is required" });
    }

    const address = new Address({
      userId: req.user.id, // from verifyToken middleware
      fullName,
      line1,
      line2,
      contactNumber,
      pincode,
      country,
      accountNumber,
    });

    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
