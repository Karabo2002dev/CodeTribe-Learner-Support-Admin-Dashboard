import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3000";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      return response.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);