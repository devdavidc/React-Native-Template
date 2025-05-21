import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import prisma from '../lib/client.js'; 

/**
 * Servicio de usuarios.
 * 
 * Esta clase encapsula toda la lógica relacionada con los usuarios.
 * Aquí se definen los métodos para:
 * - Registrar usuarios
 * - Iniciar sesión
 * - Consultar usuarios
 * - Actualizar información de usuarios
 * - Eliminar usuarios
 * 
 * Se puede ampliar añadiendo más métodos relacionados, como recuperación de contraseña, verificación de email, etc.
 */
export class UserService {

  /**
   * Registra un nuevo usuario en la base de datos.
   * 
   * @param {Object} params - Datos del nuevo usuario.
   * @param {string} params.username - Nombre de usuario.
   * @param {string} params.email - Email del usuario.
   * @param {string} params.password - Contraseña en texto plano.
   * 
   * @returns {Promise<Object>} Un objeto con:
   * - token {string}: Token JWT.
   * - user {Object}: Datos públicos del usuario.
   * 
   * @throws {Error} Si ya existe un usuario con ese email o username.
   */
  async registerUser({ username, email, password }) {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePicture: '',
        role:'user',
        createdAt: now,
        updatedAt: now
      }
    });

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  /**
   * Inicia sesión de un usuario.
   * 
   * @param {Object} params - Credenciales del usuario.
   * @param {string} params.email - Email registrado.
   * @param {string} params.password - Contraseña en texto plano.
   * 
   * @returns {Promise<Object>} Un objeto con:
   * - token {string}: Token JWT.
   * - user {Object}: Datos públicos del usuario.
   * 
   * @throws {Error} Si las credenciales son inválidas.
   */
  async loginUser({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        role: user.role
      }
    };
  }

  /**
   * Obtiene un usuario por su ID.
   * 
   * @param {number} id - ID del usuario.
   * @returns {Promise<Object>} Datos públicos del usuario.
   * @throws {Error} Si no se encuentra.
   */
  async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Actualiza información de un usuario.
   * 
   * @param {number} id - ID del usuario.
   * @param {Object} data - Datos a actualizar.
   * 
   * @returns {Promise<Object>} Datos públicos actualizados.
   */
  async updateUser(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Elimina un usuario.
   * 
   * @param {number} id - ID del usuario.
   * @returns {Promise<Object>} Mensaje de confirmación.
   */
  async deleteUser(id) {
    await prisma.user.delete({
      where: { id }
    });

    return { message: 'User deleted successfully' };
  }

  /**
   * Obtiene todos los usuarios.
   * 
   * @returns {Promise<Array>} Lista de usuarios con sus datos públicos.
   */
  async getAllUsers() {
    const users = await prisma.user.findMany();

    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  /**
   * Busca un usuario por username.
   * 
   * @param {string} username - Username del usuario.
   * @returns {Promise<Object>} Datos públicos del usuario.
   * @throws {Error} Si no se encuentra.
   */
  async getUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Busca un usuario por email.
   * 
   * @param {string} email - Email del usuario.
   * @returns {Promise<Object>} Datos públicos del usuario.
   * @throws {Error} Si no se encuentra.
   */
  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Actualiza la contraseña de un usuario.
   * 
   * @param {number} id - ID del usuario.
   * @param {string} newPassword - Nueva contraseña en texto plano.
   * @returns {Promise<Object>} Mensaje de confirmación.
   */
  async updateUserPassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    return { message: 'Password updated successfully' };
  }

  /**
   * Actualiza la foto de perfil de un usuario.
   * 
   * @param {number} id - ID del usuario.
   * @param {string} profilePicture - URL o nombre de archivo de la nueva foto.
   * @returns {Promise<Object>} Datos públicos actualizados.
   */
  async updateUserProfilePicture(id, profilePicture) {
    const user = await prisma.user.update({
      where: { id },
      data: { profilePicture }
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

/**
 * 👉 Posibles ampliaciones:
 * - Método para enviar email de verificación.
 * - Recuperación de contraseña.
 * - Control de estado activo/inactivo.
 * - Filtrado y paginado en getAllUsers().
 * - Validaciones previas antes de escribir en base de datos.
 */
