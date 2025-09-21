import Contact from "../models/Contact.js";
import User from "../models/User.js"; // your user schema

export const createContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get logged-in user from request
    const userId = req.user._id; // assuming you have auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const contact = new Contact({
      name: user.name,
      email: user.email,
      message,
      accountNumber: user.accountNumber, // attach user-facing account number
      userId: user._id,
    });

    await contact.save();

    res.status(201).json({
      message: "Contact message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({ error: "Server error" });
  }
};
