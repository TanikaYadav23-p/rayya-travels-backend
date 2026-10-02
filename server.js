const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dns = require("dns");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/admin/userlistRoutes");
const agentRoutes = require("./routes/admin/agentlistRoutes");
const airportRoutes = require("./routes/admin/airportRoutes");
const countryRoutes = require("./routes/admin/countryRoutes");
const airlineRoutes = require("./routes/admin/airlineRoutes");
const settingsRoutes = require("./routes/admin/settingsRoutes");
const supportRoutes = require("./routes/admin/supportRoutes");
const visaRoutes = require("./routes/admin/visaRoutes");
const contactRoutes = require("./routes/user/contactRoutes");

const adminVisaApplicationRoutes =
  require("./routes/admin/visaApplicationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Rayya backend is running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/airlines", airlineRoutes);
app.use("/api/admin/settings",settingsRoutes);
app.use("/api/admin/support-tickets", supportRoutes);
app.use("/api/visas", visaRoutes);
app.use(
  "/api/admin/visa-applications",
  adminVisaApplicationRoutes
);
app.use("/api/contact", contactRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));