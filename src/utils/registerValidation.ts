import { emailRegex, phoneRegex, validatePassword } from "./validation";

export interface RegisterFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export const validateRegisterForm = (
  values: RegisterFormValues,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const passwordRules = validatePassword(values.password);

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (
    values.phoneNumber &&
    !phoneRegex.test(values.phoneNumber)
  ) {
    errors.phoneNumber =
      "Enter a valid South African phone number";
  }

  if (!passwordRules.length) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!passwordRules.hasNumber || !passwordRules.hasLetter) {
    errors.password =
      "Password must contain letters and numbers";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.agreeTerms) {
    errors.terms =
      "You must agree to the Terms & Conditions";
  }

  return errors;
};
