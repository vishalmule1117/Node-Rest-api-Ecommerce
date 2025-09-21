// controllers/contact.js
import Contact from "../models/Contact.js";
import User from "../models/User.js";

// ==========================
// Create Contact Message
// ==========================
export const createContact = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    console.log("JWT user payload:", req.user);

    // Validate JWT user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { message } = req.body;

    // Validate input
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const userId = req.user.id;

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new contact message
    const contact = new Contact({
      name: user.name,
      email: user.email,
      message,
      accountNumber: user.accountNumber,
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
    // Provide detailed error in development
    res.status(500).json({ error: error.message || "Server error" });
  }
};
