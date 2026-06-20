const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeNo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  designation: { 
    type: String, 
    required: true,
    trim: true
  },
  salary: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);