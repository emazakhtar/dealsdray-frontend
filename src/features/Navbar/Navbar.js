// src/Dashboard.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUserInfo } from "../auth/authSlice";

const Navbar = ({ children }) => {
  const userInfo = useSelector(selectLoggedInUserInfo);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <img
                  className="h-8 mt-4"
                  src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png"
                  alt="Logo"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex">
                <Link
                  to={"/"}
                  className="text-gray-500 hover:bg-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to={"/employee-list"}
                  className="text-gray-500 hover:bg-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Employee List
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800 font-bold mr-4">
                {userInfo && userInfo.username}
              </span>
              <Link to={"/logout"}>
                <button className="text-gray-500 hover:bg-gray-200 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-16"> </div>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Navbar;
