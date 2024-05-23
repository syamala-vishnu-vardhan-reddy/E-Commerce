import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  error: string | null;
  loginRequest: any;
  signupRequest: any;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {},
  error: null,
  loginRequest: null,
  signupRequest: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.loginRequest = action.payload;
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
    signupRequest(state, action) {
      state.signupRequest = action.payload;
      state.isLoading = true;
    },
    signupSuccess(state, action) {
      state.user = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export const authState = (state: any) => state.auth;

export default authSlice.reducer;
