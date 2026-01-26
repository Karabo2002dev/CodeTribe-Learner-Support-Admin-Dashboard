import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../store/authSlice";
import type { RootState } from "../store/store";

import Modal from "../components/Modal";

const RegisterPage = () => {
  const dispatch = useDispatch<any>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("facilitator");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions");
      return;
    }

    dispatch(
      registerUser({
        fullName,
        email,
        phoneNumber,
        role,
        password,
      })
    );
  };

  const handleCloseModal = () => {
    dispatch(clearStatus());
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between gap-16">
      
      <section className="bg-green-500 py-4 flex items-center justify-center w-full">
        <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
      </section>

      <section className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Create Your Account
        </h1>
        <span className="text-xs text-gray-400">
          Join CodeTribe Academy to empower learners efficiently
        </span>
      </section>

      <div className="flex flex-col justify-center items-center gap-4">
        
        <button
          type="button"
          className="bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 transition-colors w-80"
        >
          <FontAwesomeIcon icon={faGoogle} style={{ color: "#fff" }} />
          <span className="ml-2">Sign up with Google</span>
        </button>

        <section className="flex items-center gap-2 text-sm text-gray-600 w-80">
          <div className="bg-green-500 w-full h-0.5" />
          <span>OR</span>
          <div className="bg-green-500 w-full h-0.5" />
        </section>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6"
        >
          <label className="text-gray-800 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Kgaphola Karabo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            required
          />

          <label className="text-gray-800 font-medium">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            required
          />

          <label className="text-gray-800 font-medium">Phone Number</label>
          <input
            type="tel"
            placeholder="+27 123 456 789"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
          />

          <label className="text-gray-800 font-medium">Password</label>
          <input
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            required
          />

          <label className="text-gray-800 font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
            required
          />

          <label className="text-gray-800 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="facilitator">Facilitator</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex items-center">
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              }
              label="I agree to the"
            />
            <Link to="/terms&conditions" className="text-green-500 text-sm">
              T's & C's
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#fff" }} />
            <span className="ml-2">
              {loading ? "Creating account..." : "Sign Up"}
            </span>
          </button>
        </form>

        <span className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500">
            Sign in
          </Link>
        </span>
      </div>

      <footer className="bg-gray-100 pt-4 w-full text-center text-gray-400 border-t border-green-500">
        &copy; 2024 CodeTribe Learner Support. All rights reserved.
      </footer>

      {success && (
        <Modal
          type="success"
          message="Account created successfully!"
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

export default RegisterPage;
