import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEmployee,
  deleteEmployeeById,
  fetchAllEmployee,
  fetchEmployeeById,
  updateEmployeeById,
} from "./employeeAPI";

const initialState = {
  employees: [],
  selectedEmployee: null,
  status: "idle",
  totalItems: 0,
  error: null,
};

export const updateEmployeeByIdAsync = createAsyncThunk(
  "employee/updateEmployeeById",
  async ({ employee, id, alert }, { rejectWithValue }) => {
    const response = await updateEmployeeById(employee, id);
    alert.success("Employee Edited");
    return response.data;
  }
);

export const fetchAllEmployeesAsync = createAsyncThunk(
  "employee/fetchAllEmployee",
  async () => {
    const response = await fetchAllEmployee();
    return response.data;
  }
);

export const deleteEmployeeByIdAsync = createAsyncThunk(
  "employee/deleteEmployeeById",
  async ({ id, alert }) => {
    const response = await deleteEmployeeById(id);
    alert.success("employee deleted");
    return response.data;
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployee",
  async ({ employee, alert }, { rejectWithValue }) => {
    try {
      console.log("async me h", employee);
      const response = await addEmployee(employee);
      alert.success("Employee Added");
      return response.data;
    } catch (error) {
      console.log("error h ");
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const fetchEmployeeByIdAsync = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (id) => {
    const response = await fetchEmployeeById(id);
    return response.data;
  }
);
export const employeeSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEmployeesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.employees = action.payload;
      })
      .addCase(updateEmployeeByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployeeByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.employees.findIndex(
          (item) => item.id === action.payload.id
        );
        state.employees.splice(index, 1, action.payload);
      })
      .addCase(addEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.employees.push(action.payload);
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("Add employee error:", action.payload);
        state.error = action.payload;
      })
      .addCase(deleteEmployeeByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployeeByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const removedEmployeeIndex = state.employees.findIndex(
          (emp) => emp._id === action.payload._id
        );
        state.employees.splice(removedEmployeeIndex, 1);
      })
      .addCase(deleteEmployeeByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        console.log("Add employee error:", action.payload);
        state.error = action.payload;
      })
      .addCase(fetchEmployeeByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedEmployee = action.payload;
      });
  },
});

export const selectAllEmployees = (state) => state.employee.employees;
export const selectEmployeeError = (state) => state.employee.error;
export const selectSelectedEmployee = (state) =>
  state.employee.selectedEmployee;
export const selectEmployeeStatus = (state) => state.employee.status;

export default employeeSlice.reducer;
