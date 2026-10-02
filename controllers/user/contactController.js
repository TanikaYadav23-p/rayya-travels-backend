const Ticket = require("../../models/admin/Ticket");

const createContactTicket = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      service,
      destination,
      travelDate,
      travellers,
      brief,
    } = req.body;

    if (!fullName || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email, phone and service are required",
      });
    }

    const ticket = await Ticket.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      destination: destination?.trim() || "",
      travelDate: travelDate || "",
      travellers: travellers?.trim() || "1 Adult",
      brief: brief?.trim() || "",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message:
        "Your message has been submitted successfully. Our support team will contact you shortly.",
      data: {
        ticketId: ticket.ticketId,
      },
    });
  } catch (error) {
    console.error("Create Contact Ticket Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to submit contact form",
    });
  }
};

module.exports = {
  createContactTicket,
};