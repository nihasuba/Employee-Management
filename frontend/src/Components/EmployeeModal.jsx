import React from 'react';

export default function EmployeeModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isEditMode, 
  name, 
  setName, 
  designation, 
  setDesignation, 
  salary, 
  setSalary 
}) {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {isEditMode ? 'Edit Employee Details' : 'Add New Employee'}
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
            <input 
              type="text" 
              value={designation} 
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input 
              type="number" 
              step="0.01"
              value={salary} 
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              {isEditMode ? 'Save Changes' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}