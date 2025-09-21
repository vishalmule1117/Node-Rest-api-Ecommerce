import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation first
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save contact if valid
    const contact = new Contact({ name, email, message });
    await contact.save();

    res
      .status(201)
      .json({ message: "Contact message sent successfully", data: contact });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({ error: "Server error" });
  }
};
