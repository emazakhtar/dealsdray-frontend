// src/EmployeeList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteEmployeeByIdAsync,
  fetchAllEmployeesAsync,
  selectAllEmployees,
  selectEmployeeStatus,
} from "../employeeSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const initialEmployees = useSelector(selectAllEmployees);
  const alert = useAlert();
  const status = useSelector(selectEmployeeStatus);

  useEffect(() => {
    dispatch(fetchAllEmployeesAsync());
  }, [dispatch]);

  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10); // Change this value for pagination

  useEffect(() => {
    setEmployees(initialEmployees);
  }, [initialEmployees]);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Active/Deactive Toggle
  const toggleActive = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  // Handle Delete
  const handleDelete = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp && emp._id !== id)
    );
    dispatch(deleteEmployeeByIdAsync({ id: id, alert }));
  };

  // Pagination Logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Sorting Function
  const sortBy = (key) => {
    const sorted = [...employees].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setEmployees(sorted);
  };

  // Filter Employees
  const filteredEmployees = currentEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-4">
      {status === "loading" ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      {/* Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded py-2 px-4"
        />
        <Link to={"/create-employee-form"}>
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Create Employee
          </button>
        </Link>
      </div>

      {/* Employee Table */}
      <table className="min-w-full bg-white shadow-md rounded mb-4 overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th
              onClick={() => sortBy("id")}
              className="cursor-pointer px-4 py-2"
            >
              ID
            </th>
            <th
              onClick={() => sortBy("name")}
              className="cursor-pointer px-4 py-2"
            >
              Name
            </th>
            <th
              onClick={() => sortBy("email")}
              className="cursor-pointer px-4 py-2"
            >
              Email
            </th>
            <th className="cursor-pointer px-4 py-2">Mobile</th>
            <th className="cursor-pointer px-4 py-2">Designation</th>
            <th className="cursor-pointer px-4 py-2">Gender</th>
            <th className="cursor-pointer px-4 py-2">Course</th>

            <th
              onClick={() => sortBy("createDate")}
              className="cursor-pointer px-4 py-2"
            >
              Create Date
            </th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id} className="border-b">
              <td className="px-4 py-2">{emp._id}</td>
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.mobile}</td>
              <td className="px-4 py-2">{emp.designation}</td>
              <td className="px-4 py-2">{emp.gender}</td>
              <td className="px-4 py-2">{emp.course}</td>
              <td className="px-4 py-2">
                {new Date(emp.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => toggleActive(emp.id)}
                  className={`py-1 px-2 rounded ${
                    emp.active
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {emp.active ? "Active" : "Inactive"}
                </button>
              </td>
              <td className="px-4 py-2">
                {/* edit employeee button  */}
                <Link to={`/edit-employee-form/${emp._id}`}>
                  <button className="text-blue-500 mr-2">Edit</button>
                </Link>
                {/* delete employeee button */}

                <button
                  onClick={() => handleDelete(emp._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < Math.ceil(employees.length / employeesPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={
            currentPage >= Math.ceil(employees.length / employeesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
