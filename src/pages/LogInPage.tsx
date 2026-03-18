import { useState, useEffect } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
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
    (state: RootState) => state.auth,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(formValues));
    }
  };

  const handleCloseModal = () => dispatch(clearStatus());

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
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, user, navigate, dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-6 py-5">
          <div className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h1 className="text-[24px] font-bold tracking-tight">
              <span className="text-[#8BC34A]">Code</span>
              <span className="text-gray-700">Tribe</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-8">
            {/* Intro */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Sign In to Your Account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Access your dashboard and continue managing your work.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
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
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Password"
                  icon={faLock}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  rightIcon={showPassword ? faEyeSlash : faEye}
                  onRightIconClick={() => setShowPassword((prev) => !prev)}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  label={
                    <span className="text-sm text-gray-600">Remember me</span>
                  }
                  sx={{ marginRight: 0 }}
                />

                <button
                  type="button"
                  className="text-sm font-medium text-green-600 transition hover:text-green-700"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                <span>{loading ? "Signing in..." : "Sign In"}</span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-100" />

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-medium text-green-600 transition hover:text-green-700"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CodeTribe Academy. All rights
        reserved.
      </footer>

      {/* Modals */}
      {success && successMessage && (
        <Modal
          type="success"
          message={successMessage}
          onClose={handleCloseModal}
        />
      )}

      {error && (
        <Modal type="error" message={error} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default LogInPage;