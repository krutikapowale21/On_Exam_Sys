require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

// Ensure we can resolve MongoDB Atlas SRV records even if the system resolver blocks SRV DNS queries
// (some networks / ISPs block SRV lookups; using a public DNS server like Google DNS can help).
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api", require("./routes/classRoutes"));
app.use("/api", require("./routes/examRoutes"));
app.use("/api", require("./routes/questionRoutes"));
app.use("/api", require("./routes/teacherRoutes"));
app.use("/api", require("./routes/studentAuthRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));




const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

// Hide password when logging
const safeUri = mongoUri.replace(/(mongodb\+srv:\/\/[^:]+:)([^@]+)/, "$1****");
console.log("ENV URI:", safeUri);

// MongoDB
const PORT = process.env.PORT || 5000;

// 🔥 CONNECT DB FIRST, THEN START SERVER
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo Error:", err);
  });