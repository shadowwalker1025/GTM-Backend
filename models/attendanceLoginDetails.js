const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  employeeId: { type: String, required: true },
  loginTime: { type: String, default: new Date().toLocaleTimeString() },
  attendance: { type: Boolean, default: true },
  shift: { type: String, required: true },
  loginDate: { type: Date, default: new Date() },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
