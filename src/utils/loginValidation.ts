import { emailRegex, validatePassword } from "./validation";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const validateLoginForm = (
  values: LoginFormValues,
): Record<string, string> => {
  const errors: Record<string, string> = {};


  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else {
    const passwordRules = validatePassword(values.password);

    if (!passwordRules.length) {
      errors.password = "Password must be at least 8 characters";
    } else if (!passwordRules.hasLetter || !passwordRules.hasNumber) {
      errors.password = "Password must contain letters and numbers";
    }
  }

  return errors;
};
