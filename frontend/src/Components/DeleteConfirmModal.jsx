import React from 'react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative animate-fadeIn text-center">
        
        {/* Warning Icon (Optional) */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <span className="text-red-600 font-bold text-xl">⚠️</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Employee</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete this employee? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg w-24 transition"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg w-24 shadow transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}