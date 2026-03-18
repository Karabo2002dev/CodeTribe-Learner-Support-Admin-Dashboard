import { useState, useEffect, type FormEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import { InputField } from "../components/InputField";
import { Role } from "../types/role";
import {
  validateRegisterForm,
  type RegisterFormValues,
} from "../utils/registerValidation";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [role, setRole] = useState<Role>(Role.Facilitator);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { loading, success, error, successMessage } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
        dispatch(clearStatus());
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  const validateForm = (): boolean => {
    const values: RegisterFormValues = {
      fullName,
      email,
      phoneNumber,
      role,
      password,
      confirmPassword,
      agreeTerms,
    };

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser({ fullName, email, phoneNumber, role, password }));
  };

  const handleCloseModal = () => dispatch(clearStatus());

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
                Create Your Account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Join CodeTribe Academy and start managing learner support
                efficiently.
              </p>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faGoogle} />
              Sign Up with Google
            </button>

            {/* Divider */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                or continue with email
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <InputField
                  label="Full Name"
                  icon={faUser}
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Email"
                  icon={faEnvelope}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Phone Number"
                  icon={faPhone}
                  placeholder="0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Select Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-900"
                  required
                >
                  {Object.values(Role).map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <InputField
                  label="Password"
                  icon={faLock}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightIcon={showPassword ? faEyeSlash : faEye}
                  onRightIconClick={() => setShowPassword((prev) => !prev)}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Confirm Password"
                  icon={faLock}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  rightIcon={showConfirmPassword ? faEyeSlash : faEye}
                  onRightIconClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      color="success"
                    />
                  }
                  label={
                    <span className="text-sm text-gray-600">
                      I agree to the Terms &amp; Conditions
                    </span>
                  }
                  sx={{ marginRight: 0 }}
                />
                {errors.terms && (
                  <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>{loading ? "Creating account..." : "Sign Up"}</span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-100" />

            {/* Sign in link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-green-600 transition hover:text-green-700"
              >
                Sign in
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

export default RegisterPage;