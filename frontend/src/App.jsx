import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployee from "./components/EditEmployee";
import AdminLogin from "./components/AdminLogin";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return token === "" ? (
    <>
      <ToastContainer />
      <AdminLogin setToken={setToken} />
    </>
  ) : (
    <div className='container  '>
      <Navbar />
      <ToastContainer />
      <section className='border-black border-x-[1px] border-b-[1px]'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route
            path='/employee_list'
            element={<EmployeeList token={token} />}
          />
          <Route
            path='/create_employee'
            element={<CreateEmployee token={token} />}
          />
          <Route
            path='/edit_employee/:_id'
            element={<EditEmployee token={token} />}
          />
        </Routes>
      </section>
    </div>
  );
};

export default App;
