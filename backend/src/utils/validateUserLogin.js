export const validateUserLogin = ({ email, password }) => {
  if (!email || !password) {
    return 'All fields are required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'Email is not valid';
  }
  return null;
}