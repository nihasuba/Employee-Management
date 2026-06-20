const Employee = require('../models/employee');

// 1. Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }); 
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Add New Employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, designation, salary } = req.body;

    let employeeNo;
    let employeeExists = true;

    const lastEmployee = await Employee.findOne()
      .sort({ createdAt: -1 })
      .lean();

    let nextNumber = 101;

    if (lastEmployee?.employeeNo) {
      const lastNumber = parseInt(
        lastEmployee.employeeNo.replace("EMP", ""),
        10
      );

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    while (employeeExists) {
      employeeNo = `EMP${nextNumber}`;

      const existing = await Employee.findOne({ employeeNo });

      if (!existing) {
        employeeExists = false;
      } else {
        nextNumber++;
      }
    }

    const newEmployee = await Employee.create({
      employeeNo,
      name,
      designation,
      salary,
    });

    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// 3. Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4. Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};