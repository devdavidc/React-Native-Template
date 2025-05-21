import jwt from 'jsonwebtoken';

/**
 * Genera un token JWT para un usuario.
 * @param {string} userId - ID del usuario.
 * @returns {string} - Token JWT firmado.
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' } // Token válido durante 30 días
  );
};
