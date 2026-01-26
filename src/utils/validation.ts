export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneRegex =
  /^(\+27|0)[6-8][0-9]{8}$/;  

export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasLetter: /[a-zA-Z]/.test(password),
  };
};  