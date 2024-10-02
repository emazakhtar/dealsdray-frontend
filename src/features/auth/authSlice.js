import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, loadUsersInfo, loginUser, signOut } from "./authAPI";

const initialState = {
  LoggedInUserToken: null,
  status: "idle",
  checkUserInitialized: "false",
  error: null,
  checkedUser: false,
  LoggedInUserInfo: null,
};

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async ({ data, alert }, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (error) {
      alert.error("Invalid Credentials");
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "auth/signOut",
  async (rejectWithValue) => {
    try {
      const response = await signOut();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (rejectWithValue) => {
    try {
      const response = await checkUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loadUsersInfoAsync = createAsyncThunk(
  "user/loadUsersInfo",
  async () => {
    const response = await loadUsersInfo();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logOutUser: (state) => {
      state.LoggedInUserToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserToken = action.payload;
        state.checkedUser = true;
        state.checkUserInitialized = true;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.checkedUser = true;
        state.checkUserInitialized = true;
      })
      .addCase(loadUsersInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUsersInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUserInfo = action.payload;
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.LoggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectCheckedUser = (state) => state.auth.checkedUser;
export const selectcheckedUserInitialized = (state) =>
  state.auth.checkUserInitialized;
export const selectLoggedInUserInfo = (state) => state.auth.LoggedInUserInfo;

export default authSlice.reducer;
