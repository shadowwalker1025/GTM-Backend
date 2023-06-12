const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// Add employee route
const addEmployee = (req, res) => {
  const { employeeId, emailId, fullName, position, department, password, date } =
    req.body;

  // Hash the password before saving to MongoDB
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: "Failed to add employee" });
    } else {
      // Create a new Employee instance
      const newEmployee = new Employee({
        employeeId,
        emailId,
        fullName,
        position,
        department,
        password: hashedPassword,
        date,
      });

      // Save the employee data to MongoDB
      newEmployee
        .save()
        .then(() => {
          // Generate PDF
          const pdfDoc = new PDFDocument();
          const filePath = `/Users/nagatere/Downloads/GTM/Backend_GTM/hrms/employee_offerletters_pdf/employee${employeeId}.pdf`; // File path to save the PDF
          pdfDoc.pipe(fs.createWriteStream(filePath));
          pdfDoc.fontSize(20).text("Employee Details", { underline: true });
          pdfDoc.fontSize(12).text(`Employee ID: ${employeeId}`);
          pdfDoc.fontSize(12).text(`Full Name: ${fullName}`);
          pdfDoc.fontSize(12).text(`Position: ${position}`);
          pdfDoc.fontSize(12).text(`Department: ${department}`);
          pdfDoc.fontSize(12).text(`Dear ${fullName},\n\nCongratulations! You have been added as a new employee to our company. Your employee ID is ${employeeId} and password is ${password}.\n\nWelcome aboard!\n\nBest regards,\nThe HR Team`);
          pdfDoc.end();

          // Send email to the employee
          const gmailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "nagendra.tere@gmail.com",
              pass: "uzmbueraytsomhtc",
            },
          });

          const mailOptions = {
            from: "nagendra.tere@gmail.com",
            to: emailId,
            subject: "Welcome to the company!",
            text: `Dear ${fullName},\n\nCongratulations! You have been added as a new employee to our company. Your employee ID is ${employeeId}.\n\nWelcome aboard!\n\nBest regards,\nThe HR Team`,
            attachments: [
              {
                filename: "employee.pdf",
                path: filePath,
                contentType: "application/pdf",
              },
            ],
          };

          // Send email using Gmail transporter
          gmailTransporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending Gmail email:", error);
            } else {
              console.log("Gmail email sent:", info.response);
            }
          });

          res.json({ message: "Employee added successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to add employee" });
        });
    }
  });
};
// Get all employees route
const getAllEmployees = (req, res) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch employees" });
    });
};

// Get employee by ID route
const getEmployeeById = (req, res) => {
  const employeeId = req.params.id;

  Employee.findOne({ employeeId: employeeId })
    .then((employee) => {
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
      } else {
        res.json(employee);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch employee' });
    });
};

// Update employee route
const updateEmployee = (req, res) => {
  const employeeId = req.params.id;
  const { fullName, position, department, password } = req.body;

  Employee.findOne({ employeeId: employeeId })
    .then((employee) => {
      if (!employee) {
        res.status(404).json({ error: 'Employee not found' });
      } else {
        // Update the employee details
        employee.fullName = fullName;
        employee.position = position;
        employee.department = department;
        employee.password = password;

        // Save the updated employee data to MongoDB
        employee
          .save()
          .then(() => {
            res.json({ message: 'Employee updated successfully' });
          })
          .catch((error) => {
            res.status(500).json({ error: 'Failed to update employee' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch employee' });
    });
};
  

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
};
