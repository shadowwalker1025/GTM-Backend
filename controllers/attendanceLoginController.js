const Attendance = require("../models/attendanceLoginDetails");

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const { employeeId, shift } = req.body;

    const loginTime = new Date().toLocaleTimeString(); // Default login time as current time
    const attendance = true; // Default attendance as true
    const loginDate = new Date();
    const newAttendance = new Attendance({
      employeeId,
      loginTime,
      attendance,
      shift,
      loginDate,
    });

    await newAttendance.save();

    res.json({ message: "Attendance recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to record attendance" });
  }
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};

// Get attendance records by employee ID
const getAttendanceByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const attendance = await Attendance.find({ employeeId });
    res.json(attendance);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch attendance records for the employee" });
  }
};

// Update attendance record by employee ID
const updateAttendanceByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body;

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { employeeId },
      updateData,
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.json({
      message: "Attendance record updated successfully",
      attendance: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update attendance record" });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceByEmployeeId,
  updateAttendanceByEmployeeId,
};

// const Attendance = require('../models/Attendance');

// // Create attendance record
// const createAttendance = async (req, res) => {
//   try {
//     const { employeeId, shift } = req.body;

//     const loginTime = new Date().toLocaleTimeString(); // Default login time as current time
//     const attendance = true; // Default attendance as true
//     const loginDate = new Date()
//     const newAttendance = new Attendance({
//       employeeId,
//       loginTime,
//       attendance,
//       shift,
//       loginDate
//     });

//     await newAttendance.save();

//     res.json({ message: 'Attendance recorded successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to record attendance' });
//   }
// };

// // Get all attendance records
// const getAllAttendance = async (req, res) => {
//   try {
//     const attendance = await Attendance.find();
//     res.json(attendance);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch attendance records' });
//   }
// };

// module.exports = {
//   createAttendance,
//   getAllAttendance,
// };
