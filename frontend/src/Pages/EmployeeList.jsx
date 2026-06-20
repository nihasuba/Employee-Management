import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeModal from '../Components/EmployeeModal';
import DeleteConfirmModal from '../Components/DeleteConfirmModal'; 
import { toast } from 'react-toastify';

// const API_URL = 'http://localhost:5000/api/employees';
const API_URL = 'https://employee-management-q87u.vercel.app/api';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Delete Popup States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [deleteId, setDeleteId] = useState(null); 

  // Form States
  const [currentId, setCurrentId] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  const [activeMenuId, setActiveMenuId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      toast.error("Failed to load employee data!");
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setName('');
    setDesignation('');
    setSalary('');
    setIsModalOpen(true);
  };

  const openEditModal = (emp) => {
    setIsEditMode(true);
    setCurrentId(emp._id);
    setName(emp.name);
    setDesignation(emp.designation);
    setSalary(emp.salary);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !designation || !salary || salary <= 0) {
      toast.warning("Please enter valid details!");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${currentId}`, { name, designation, salary });
        toast.success("Employee details updated successfully!");
      } else {
        await axios.post(API_URL, { name, designation, salary });
        toast.success("New employee added successfully!");
      }
      fetchEmployees();
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Something went wrong while saving data!");
      console.error("Error saving data", err);
    }
  };

  const openDeletePopup = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null); 
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      toast.success("Employee deleted successfully!");
      fetchEmployees();
      setIsDeleteModalOpen(false); 
      setDeleteId(null);
    } catch (err) {
      toast.error("Failed to delete employee!");
      console.error("Error deleting employee", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
          <button 
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
          >
            + Add Employee
          </button>
        </div>

        <div className="w-full bg-white rounded-lg border border-gray-200">
          <table className="w-full table-fixed divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="w-1/5 px-4 py-3 font-semibold">Employee No</th>
                <th className="w-1/4 px-4 py-3 font-semibold">Employee Name</th>
                <th className="w-1/4 px-4 py-3 font-semibold">Designation</th>
                <th className="w-1/6 px-4 py-3 font-semibold">Salary</th>
                <th className="w-1/12 px-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No employees found. Click "+ Add Employee" to start.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900 truncate">{emp.employeeNo}</td>
                    <td className="px-4 py-4 text-gray-700 truncate">{emp.name}</td>
                    <td className="px-4 py-4 text-gray-600 truncate">{emp.designation}</td>
                    <td className="px-4 py-4 text-gray-700">Rs. {Number(emp.salary).toLocaleString()}</td>
                    <td className="px-4 py-4 text-center relative">
                      
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === emp._id ? null : emp._id)}
                        className="text-gray-500 hover:text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 focus:outline-none"
                      >
                        ⋮
                      </button>

                      {activeMenuId === emp._id && (
                        <div className="absolute right-14 top-8 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button 
                            onClick={() => openEditModal(emp)}
                            className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <EmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
        name={name}
        setName={setName}
        designation={designation}
        setDesignation={setDesignation}
        salary={salary}
        setSalary={setSalary}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}