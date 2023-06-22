const Logout = require('../models/attendanceLogoutDetails');

// Create logout record
const createLogout = async (req, res) => {
  try {
    const { employeeId, logoutTime } = req.body;

    const logoutDate = new Date();
    const newLogout = new Logout({
      employeeId,
      logoutTime,
      logoutDate,
    });

    await newLogout.save();

    res.json({ message: 'Logout recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record logout' });
  }
};

// Get all logout records
const getAllLogout = async (req, res) => {
  try {
    const logout = await Logout.find();
    res.json(logout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logout records' });
  }
};

// Get logout records by employee ID
const getLogoutByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const logout = await Logout.find({ employeeId });
    res.json(logout);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch logout records for the employee' });
  }
};

// Update logout record by employee ID
const updateLogoutByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body;

    const updatedLogout = await Logout.findOneAndUpdate(
      { employeeId },
      updateData,
      { new: true }
    );

    if (!updatedLogout) {
      return res.status(404).json({ error: 'Logout record not found' });
    }

    res.json({
      message: 'Logout record updated successfully',
      logout: updatedLogout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update logout record' });
  }
};

module.exports = {
  createLogout,
  getAllLogout,
  getLogoutByEmployeeId,
  updateLogoutByEmployeeId,
};
