import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Genera un token JWT para un usuario.
 * @param {Object} user - Objeto usuario.
 * @returns {string} - Token JWT firmado.
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};
