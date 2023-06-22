const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceLoginRoutes = require('./routes/attendanceLoginRoutes');
const attendanceLogoutRoutes = require('./routes/attendanceLogoutRoutes')

const app = express();

const url =
  'mongodb+srv://nagendratere:fm5mYMUwvVT2QTlX@cluster0.nnrix2r.mongodb.net/MyDatabase?retryWrites=true&w=majority';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance/login', attendanceLoginRoutes);
app.use('/api/attendance/logout', attendanceLogoutRoutes);


const port = 3021;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
