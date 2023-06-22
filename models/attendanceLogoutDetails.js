const mongoose = require("mongoose");

// Define the schema for the logout details
const LogoutSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  logoutTime: {
    type: String,
    default: new Date().toLocaleTimeString(),
  },
  logoutDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Logout model
const Logout = mongoose.model("Logout", LogoutSchema);

// Export the Logout model
module.exports = Logout;
