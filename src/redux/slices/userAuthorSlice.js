import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userAuthorLoginThunk = createAsyncThunk(
  'user-author-login',
  async (userCredObj, thunkAPI) => {
    try {
      const url = userCredObj.userType === 'author' ? 'http://localhost:4000/author-api/login' : 'http://localhost:4000/user-api/login';
      const res = await axios.post(url, userCredObj);

      if (res.data.message === "login done!") {
        localStorage.setItem('token', res.data.token);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(res.data.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'An error occurred');
    }
  }
);

const userAuthorSlice = createSlice({
  name: "userAuthor",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccurred: false,
    errMsg: ''
  },
  reducers: {
    resetState: (state) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginUserStatus = false;
      state.errorOccurred = false;
      state.errMsg = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAuthorLoginThunk.pending, (state) => {
        state.isPending = true;
        state.errorOccurred = false;
      })
      .addCase(userAuthorLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg = '';
        state.errorOccurred = false;
      })
      .addCase(userAuthorLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg = action.payload || 'An error occurred';
        state.errorOccurred = true;
      });
  }
});

export const { resetState } = userAuthorSlice.actions;

export default userAuthorSlice.reducer;