import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import type { User, AuthResponse } from "../types/auth";
import { Role } from "../types/role";

const API_URL = import.meta.env.VITE_API_URL as string;

interface AuthState {
  user: User | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  successMessage?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: Role;
}

interface ApiErrorResponse {
  message?: string;
}

function getStoredUser(): User | null {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return axiosError.response?.data?.message ?? axiosError.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

const initialState: AuthState = {
  user: getStoredUser(),
  loading: false,
  success: false,
  error: null,
  successMessage: undefined,
};

export const loginUser = createAsyncThunk<
  { user: User; message: string },
  LoginPayload,
  { rejectValue: string }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      localStorage.setItem("auth_token", token);

      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { token });

      localStorage.setItem("user", JSON.stringify(data.user));

      return { user: data.user, message: data.message };
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Invalid email or password"));
    }
  }
);

export const registerUser = createAsyncThunk<
  { user: User; message: string },
  RegisterPayload,
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

      localStorage.setItem("user", JSON.stringify(data.user));

      return { user: data.user, message: data.message };
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, "Registration failed"));
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = undefined;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; message: string }>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload.user;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = undefined;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: User; message: string }>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload.user;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const { clearStatus, logout } = authSlice.actions;
export default authSlice.reducer;