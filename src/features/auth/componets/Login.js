// src/Login.js
import React, { useState } from "react";
import {
  loginUserAsync,
  selectError,
  selectLoggedInUserToken,
} from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, setError] = useState("");
  const error = useSelector(selectError);
  const userLogggedInToken = useSelector(selectLoggedInUserToken);
  const dispatch = useDispatch();
  const alert = useAlert();

  if (userLogggedInToken) {
    return <Navigate to="/dashboard" replace={true}></Navigate>;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    dispatch(loginUserAsync({ data: data, alert }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error.message}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
          {errorr && (
            <p className="text-red-500 text-sm text-center mb-4">{errorr}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
