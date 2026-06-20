import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './Pages/EmployeeList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<EmployeeList />} />
      </Routes>
    </> 
  );
}