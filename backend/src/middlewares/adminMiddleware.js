/**
 * Middleware para verificar si el usuario autenticado es administrador.
 * 
 * Comprueba la propiedad 'role' del usuario y permite el acceso solo si es 'admin'.
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
  