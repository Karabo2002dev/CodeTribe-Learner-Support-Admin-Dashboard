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
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store/store";

import Modal from "../components/Modal";
import { InputField } from "../components/InputField";
import { Role } from "../types/role";
import {
  validateRegisterForm,
  type RegisterFormValues,
} from "../utils/registerValidation";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<Role>(Role.Facilitator);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { loading, success, error, successMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
  if (success) {
    setTimeout(() => {
      navigate("/login");
      dispatch(clearStatus());
    }, 1500);
  }
}, [success, navigate, dispatch]);



  const validateForm = (): boolean => {
    const values: RegisterFormValues = {
      fullName,
      email,
      role,
      phoneNumber,
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
    <main className="flex flex-col min-h-screen items-center justify-between gap-8">

      <section className="bg-green-500 py-4 flex justify-center w-full">
        <img src="/src/assets/CodeTribe Logo.svg" alt="CodeTribe Logo" />
      </section>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Create Your Account
        </h1>
        <p className="text-gray-500">
          Join CodeTribe Academy to empower learners efficiently
        </p>
      </div>

      <section className="flex flex-col items-center gap-6">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white"
        >
          <FontAwesomeIcon icon={faGoogle} />
          Sign Up with Google
        </button>

        <span className="text-gray-400">or</span>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-80 border border-green-500 rounded-lg p-6"
        >

          <InputField
            label="Full Name"
            icon={faUser}
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName}</p>
          )}

          <InputField
            label="Email"
            icon={faEnvelope}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <InputField
            label="Phone Number"
            icon={faPhone}
            placeholder="0712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
          )}

          <InputField
            label="Password"
            icon={faLock}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={showPassword ? faEyeSlash : faEye}
            onRightIconClick={() => setShowPassword((p) => !p)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <InputField
            label="Confirm Password"
            icon={faLock}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightIcon={showConfirmPassword ? faEyeSlash : faEye}
            onRightIconClick={() => setShowConfirmPassword((p) => !p)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <label htmlFor="role" className="text-gray-500 mb-1">
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="border border-green-500 rounded-md p-2"
            required
          >
            {Object.values(Role).map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>

          {/* Terms */}
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
            }
            label="I agree to the Terms & Conditions"
          />
          {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

          <button
            disabled={loading}
            className="bg-green-500 text-white py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </section>

      <footer className="text-sm text-gray-400 pb-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Sign in
        </Link>
        <div className="mt-2">© {new Date().getFullYear()} CodeTribe Academy</div>
      </footer>

      {success && successMessage && (
        <Modal type="success" message={successMessage} onClose={handleCloseModal} />
      )}
      {error && <Modal type="error" message={error} onClose={handleCloseModal} />}
    </main>
  );
};

export default RegisterPage;
