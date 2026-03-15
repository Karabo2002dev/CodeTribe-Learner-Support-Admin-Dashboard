import { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearStatus } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import { InputField } from "../components/InputField";
import { validateLoginForm } from "../utils/loginValidation";

interface FormValues {
  email: string;
  password: string;
}

const LogInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const { loading, success, error, successMessage, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(formValues));
    }
  };

  // Close modal
  const handleCloseModal = () => dispatch(clearStatus());

  // Redirect after successful login
  useEffect(() => {
    if (success && user) {
      const timer = setTimeout(() => {
        if (user.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (user.role === "FACILITATOR") {
          navigate("/facilitator/assigned-queries");
        } else {
          navigate("/login");
        }
        dispatch(clearStatus());
      }, 1000); // short delay to show success modal

      return () => clearTimeout(timer);
    }
  }, [success, user, navigate, dispatch]);

  // Auto-close modal after 4 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <main className="flex flex-col min-h-screen justify-between items-center gap-16 bg-gray-50">
      {/* Header */}
      <section className="bg-green-500 py-4 flex justify-center w-full">
        <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
      </section>

      {/* Login Form */}
      <div className="flex flex-col items-center w-full gap-8">
        <h1 className="text-2xl font-bold text-gray-500">
          Sign In To Your Account
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-80 border border-green-500 rounded-lg p-6 bg-white shadow"
        >
          {/* Email */}
          <InputField
            label="Email"
            icon={faEnvelope}
            type="email"
            name="email"
            value={formValues.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          {/* Password */}
          <InputField
            label="Password"
            icon={faLock}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValues.password}
            placeholder="Enter your password"
            onChange={handleChange}
            rightIcon={showPassword ? faEyeSlash : faEye}
            onRightIconClick={() => setShowPassword(!showPassword)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          {/* Remember me */}
          <FormControlLabel
            control={<Checkbox color="success" />}
            label="Remember me"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 py-4 flex justify-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CodeTribe Academy. All rights reserved.
      </footer>

      {/* Modals */}
      {success && successMessage && (
        <Modal
          type="success"
          message={successMessage}
          onClose={handleCloseModal}
        />
      )}
      {error && <Modal type="error" message={error} onClose={handleCloseModal} />}
    </main>
  );
};

export default LogInPage;