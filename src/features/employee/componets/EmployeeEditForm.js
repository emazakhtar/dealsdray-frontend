// src/components/UpdateEmployeeForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchEmployeeByIdAsync,
  selectEmployeeStatus,
  selectSelectedEmployee,
  updateEmployeeByIdAsync,
} from "../employeeSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

const UpdateEmployeeForm = ({ existingEmails, onUpdateEmployee }) => {
  const alert = useAlert();
  const status = useSelector(selectEmployeeStatus);

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
    createDate: "",
    image: null,
  });
  const dispatch = useDispatch();
  const params = useParams();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchEmployeeByIdAsync(params.id));
  }, [dispatch, params]);

  const employeeData = useSelector(selectSelectedEmployee);

  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name,
        email: employeeData.email,
        mobile: employeeData.mobile,
        designation: employeeData.designation,
        gender: employeeData.gender,
        courses: {
          MCA: employeeData.courses.MCA,
          BCA: employeeData.courses.BCA,
          BSC: employeeData.courses.BSC,
        },
        image: null, // Keep this null for file input
      });
    }
  }, [employeeData]);

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericPattern = /^[0-9]+$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!numericPattern.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be numeric.";
    }

    if (!formData.designation)
      newErrors.designation = "Designation is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";

    if (formData.image) {
      const fileExtension = formData.image.name.split(".").pop();
      if (!["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
        newErrors.image = "Only JPG or PNG files are allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

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
    console.log("hjhjhjh");
    e.preventDefault();
    if (validate()) {
      console.log("/.........");
      dispatch(
        updateEmployeeByIdAsync({
          employee: formData,
          id: employeeData._id,
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
        image: null,
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-gray-100 p-8">
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
      <h2 className="text-2xl font-bold mb-4 text-center">Update Employee</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Name */}
        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mr-4"
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mr-4"
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>

        {/* Mobile No */}
        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mr-4"
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
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.mobile ? "border-red-500" : ""
            }`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs italic">{errors.mobile}</p>
          )}
        </div>

        {/* Designation */}
        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mr-4"
            htmlFor="designation"
          >
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.designation ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              Select designation
            </option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            <option value="Intern">Intern</option>
          </select>
          {errors.designation && (
            <p className="text-red-500 text-xs italic">{errors.designation}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </span>
          <div className="flex items-center mb-2">
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
          {errors.gender && (
            <p className="text-red-500 text-xs italic">{errors.gender}</p>
          )}
        </div>

        {/* Courses */}
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">
            Courses
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

        {/* Image Upload */}
        <div className="flex items-center mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mr-4"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-xs italic">{errors.image}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
