// controllers/contact.js
import Contact from "../models/Contact.js";
import User from "../models/User.js";

// ==========================
// Create Contact Message
// ==========================
export const createContact = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get logged-in user from JWT middleware
    // NOTE: req.user.id comes from verifyToken
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new contact message
    const contact = new Contact({
      name: user.name,
      email: user.email,
      message,
      accountNumber: user.accountNumber, // attach user-facing account number
      userId: user._id,
    });

    await contact.save();

    // Return success response
    res.status(201).json({
      message: "Contact message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({ error: "Server error" });
  }
};
