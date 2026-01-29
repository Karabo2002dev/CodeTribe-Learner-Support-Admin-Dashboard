import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearStatus } from "../store/authSlice";
import type { RootState } from "../store/store";

import Modal from "../components/Modal";
import { emailRegex } from "../utils/validation";

const LogInPage = () => {
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth
  );

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

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

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6"
      >
        <label className="text-gray-800 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border rounded-md p-2 focus:ring-2 ${
            errors.email ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-500"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <label className="text-gray-800 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border rounded-md p-2 focus:ring-2 ${
            errors.password ? "border-red-500 focus:ring-red-400" : "border-green-300 focus:ring-green-500"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}

        <FormControlLabel control={<Checkbox color="success" />} label="Remember me" />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          <span className="ml-2">{loading ? "Signing in..." : "Sign In"}</span>
        </button>
      </form>

      {success && (
        <Modal type="success" message="Login successful!" onClose={handleCloseModal} />
      )}

      {error && (
        <Modal type="error" message={error} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default LogInPage;
