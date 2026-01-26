import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearStatus } from "../store/authSlice";
import { RootState } from "../store/store";

import Modal from "../components/Modal";

const LogInPage = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between gap-16">
      <section className="bg-green-500 py-4 flex items-center justify-center w-full">
        <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
      </section>
      <h1 className="text-2xl font-bold text-gray-500">
        Sign In To Your Account
      </h1>
      <div className="flex flex-col justify-center items-center gap-4">
        <form className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6">
        <label htmlFor="email" className="text-gray-800 font-medium">
          Email or username
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <label htmlFor="password" className="text-gray-800 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FormControlLabel
          control={<Checkbox color="success" />}
          label="Remember me"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <FontAwesomeIcon icon={faUserPlus} style={{ color: "#ffff" }} />
          <span className="ml-2">Sign In</span>
        </button>
      </form>
      <section className="flex justify-center text-sm text-gray-600">
        <div className="bg-green-500 w-full h-0.5" />
        <span>OR</span>
        <div className="bg-green-500 w-full h-0.5" />
      </section>
      <button
        type="submit"
        className="bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 transition-colors"
        aria-label="Sign in with Google"
        title="Sign in with Google"
      >
        <FontAwesomeIcon icon={faGoogle} style={{ color: "#ffff" }} />
        <span className="sr-only">Sign in with Google</span>
      </button>
      <span className="text-gray-600">
        Don't have an account?{" "}
        <a href="#" className="text-green-500">
          Sign Up
        </a>
      </span>
      </div>

      <footer className="bg-gray-100 pt-4 w-full text-center text-gray-400 border-t border-green-500">
        &copy; 2024 CodeTribe learner Support. All rights reserved.
      </footer>
    </main>
  );
};

export default LogInPage;
