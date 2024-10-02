import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/componets/Login";
import Dashboard from "./features/dasboard/componets/Dashboard";
import EmployeeList from "./features/employee/componets/EmployeeList";
import EmployeeCreateForm from "./features/employee/componets/EmployeeCreateForm";
import EmployeeEditForm from "./features/employee/componets/EmployeeEditForm";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserAsync,
  loadUsersInfoAsync,
  selectLoggedInUserToken,
} from "./features/auth/authSlice";
import Protected from "./features/auth/componets/Protected";
import Logout from "./features/auth/componets/Logout";
import Navbar from "./features/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Navbar>
          <Dashboard />
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/employee-list",
    element: (
      <Protected>
        <Navbar>
          <EmployeeList />
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/create-employee-form",
    element: (
      <Protected>
        <Navbar>
          <EmployeeCreateForm />
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/edit-employee-form/:id",
    element: (
      <Protected>
        <Navbar>
          <EmployeeEditForm />
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    if (!user) {
      dispatch(checkUserAsync());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(loadUsersInfoAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <React.StrictMode>
        {/* Use RouterProvider to set up the routing context */}
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;
