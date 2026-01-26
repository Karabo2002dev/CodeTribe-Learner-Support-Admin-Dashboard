import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearStatus } from "../store/authSlice";
import type{ RootState } from "../store/store";

import Modal from "../components/Modal";

const LogInPage = () => {
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  const handleCloseModal = () => {
    dispatch(clearStatus());
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between gap-16">
      
      <section className="bg-green-500 py-4 flex items-center justify-center w-full">
        <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
      </section>

      <h1 className="text-2xl font-bold text-gray-500">
        Sign In To Your Account
      </h1>

      <div className="flex flex-col justify-center items-center gap-4">
        
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6"
        >
          <label htmlFor="email" className="text-gray-800 font-medium">
            Email or username
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // update email state
            className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <label htmlFor="password" className="text-gray-800 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // update password state
            className="border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <FormControlLabel
            control={<Checkbox color="success" />}
            label="Remember me"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#fff" }} />
            <span className="ml-2">
              {loading ? "Signing in..." : "Sign In"}
            </span>
          </button>
        </form>

        <section className="flex items-center gap-2 text-sm text-gray-600 w-80">
          <div className="bg-green-500 w-full h-0.5" />
          <span>OR</span>
          <div className="bg-green-500 w-full h-0.5" />
        </section>

        <button
          type="button"
          className="bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 transition-colors w-80"
          aria-label="Sign in with Google"
          title="Sign in with Google"
        >
          <FontAwesomeIcon icon={faGoogle} style={{ color: "#fff" }} />
          <span className="ml-2">Sign in with Google</span>
        </button>

        <span className="text-gray-600">
          Don't have an account?{" "}
          <a href="/" className="text-green-500">
            Sign Up
          </a>
        </span>
      </div>

      <footer className="bg-gray-100 pt-4 w-full text-center text-gray-400 border-t border-green-500">
        &copy; 2024 CodeTribe Learner Support. All rights reserved.
      </footer>

      {success && (
        <Modal
          type="success"
          message="Login successful!"
          onClose={handleCloseModal}
        />
      )}

      {error && (
        <Modal
          type="error"
          message={error}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
};

export default LogInPage;
