import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import type { User, AuthResponse } from "../types/auth";
import { Role } from "../types/role";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  user: User | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  successMessage?: string; 
}

const initialState: AuthState = {
  user: null,
  loading: false,
  success: false,
  error: null,
  successMessage: undefined,
};


export const loginUser = createAsyncThunk<
  { user: User; message: string },
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("auth_token", token);

      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { token });
      return { user: data.user, message: data.message };
    } catch (err: any) {
      if (err.response?.data?.message) return rejectWithValue(err.response.data.message);
      return rejectWithValue(err.message || "Invalid email or password");
    }
  }
);

export const registerUser = createAsyncThunk<
  { user: User; message: string },
  { email: string; password: string; fullName: string; phoneNumber: string; role: Role },
  { rejectValue: string }
>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        email: payload.email,
        role: payload.role,
      });

      return { user: data.user, message: data.message };
    } catch (err: any) {
      if (err.response?.data?.message) return rejectWithValue(err.response.data.message);
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
 reducers: {
  clearStatus: (state) => {
    state.error = null;
    state.success = false;
    state.successMessage = undefined;
  },
  logout: (state) => {
    state.user = null;
    state.loading = false;
    state.success = false;
    state.error = null;
    state.successMessage = undefined;

    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  },
  loadUserFromStorage: (state) => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      state.user = JSON.parse(savedUser);
    }
  },
},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; message: string }>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // persist user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; message: string }>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // persist user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { clearStatus, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;