// src/components/CreateEmployeeForm.js
import React, { useState } from "react";
import { addEmployeeAsync, selectEmployeeError } from "../employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const CreateEmployeeForm = () => {
  const error = useSelector(selectEmployeeError);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: {
      MCA: false,
      BCA: false,
      BSC: false,
    },
    image: null,
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        courses: {
          ...prevData.courses,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit me hai", formData);
    const courses = formData.courses;
    console.log(courses);
    const selectedCourse = Object.keys(courses).find(
      (course) => courses[course]
    );
    console.log(selectedCourse); // Output: "MCA"
    const updatedFormData = { ...formData, course: selectedCourse };
    console.log("updatedForm dATA", updatedFormData);
    dispatch(
      addEmployeeAsync({
        employee: { ...updatedFormData },
        alert,
      })
    );
    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      gender: "",
      courses: { MCA: false, BCA: false, BSC: false },
      createDate: "",
      image: null,
    });
  };

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Employee</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobile"
          >
            Mobile No
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="designation"
          >
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select designation
            </option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            <option value="Intern">Intern</option>
            {/* Add more designations as needed */}
          </select>
        </div>

        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </span>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2">Female</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2">Other</span>
          </label>
        </div>

        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Course
          </span>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              name="MCA"
              checked={formData.courses.MCA}
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">MCA</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              name="BCA"
              checked={formData.courses.BCA}
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">BCA</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              name="BSC"
              checked={formData.courses.BSC}
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">BSC</span>
          </label>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Employee
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
