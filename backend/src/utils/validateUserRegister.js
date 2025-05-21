/**
 * Valida los datos de registro de un usuario.
 * @param {Object} param0 - Datos de usuario.
 * @returns {string|null} - Mensaje de error si hay, null si todo está bien.
 */
export const validateUserRegister = ({ username, email, password }) => {
  if (!username || !email || !password) {
    return 'All fields are required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }

  return null;
};
