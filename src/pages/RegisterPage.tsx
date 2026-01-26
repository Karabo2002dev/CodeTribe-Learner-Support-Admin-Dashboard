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
import { emailRegex, phoneRegex, validatePassword } from "../utils/validation";

const RegisterPage = () => {
  const dispatch = useDispatch<any>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("facilitator");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { loading, success, error } = useSelector(
    (state: RootState) => state.auth
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const passwordRules = validatePassword(password);

    if (fullName.trim().length < 3)
      newErrors.fullName = "Full name must be at least 3 characters";

    if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address";

    if (phoneNumber && !phoneRegex.test(phoneNumber))
      newErrors.phoneNumber = "Enter a valid South African phone number";

    if (!passwordRules.length)
      newErrors.password = "Password must be at least 8 characters";

    if (!passwordRules.hasNumber || !passwordRules.hasLetter)
      newErrors.password = "Password must contain letters and numbers";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!agreeTerms)
      newErrors.terms = "You must agree to the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(
      registerUser({ fullName, email, phoneNumber, role, password })
    );
  };

  const handleCloseModal = () => dispatch(clearStatus());

  return (
    <main className="flex flex-col min-h-screen items-center justify-between gap-16">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-80 border border-gray-300 rounded-lg p-6"
      >
        <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <input placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}

        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

        <FormControlLabel
          control={<Checkbox checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />}
          label="I agree to the Terms & Conditions"
        />
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}

        <button disabled={loading} className="bg-green-500 text-white py-2 rounded-md">
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {success && <Modal type="success" message="Account created successfully!" onClose={handleCloseModal} />}
      {error && <Modal type="error" message={error} onClose={handleCloseModal} />}
    </main>
  );
};

export default RegisterPage;
