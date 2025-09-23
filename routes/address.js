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

// get all user address details user Logged in
router.get("/", verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//! Update  and address

//! Delete address
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
});

//? set default address
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Remove default from other addresses
router.put("/default/:id", verifyToken, async (req, res) => {
  try {
    //Remove default from other addresses
    await Address.updateMany(
      { userId: req.user.id, isDefault: true },
      { $set: { isDefault: false } }
    );

    // Set this address as default
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: { isDefault: true } },
      { new: true } // return the updated document
    );

    if (!updated) {
      return res.status(400).json({ message: "Address not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
