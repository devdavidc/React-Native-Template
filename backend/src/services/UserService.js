import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import prisma from '../lib/client.js';
/**
 * Servicio de usuarios.
 * Encapsula toda la lógica relacionada con los usuarios.
 */
export class UserService {
  /**
   * Registra un nuevo usuario en la base de datos.
   * @param {Object} param0 - Datos del usuario.
   * @returns {Object} - Token JWT y datos públicos del usuario creado.
   */

  /**
 * Servicio para manejar el registro de un nuevo usuario.
 *
 * Este método recibe los datos de registro (username, email y contraseña),
 * verifica si ya existe un usuario con ese email o username en la base de datos.
 * Si existe, lanza un error controlado. Si no existe, hashea la contraseña,
 * crea el nuevo usuario en la base de datos, genera un token de autenticación
 * y devuelve los datos públicos del usuario junto con el token.
 * 
 * @param {Object} params - Objeto con los datos del nuevo usuario.
 * @param {string} params.username - Nombre de usuario.
 * @param {string} params.email - Correo electrónico del usuario.
 * @param {string} params.password - Contraseña en texto plano.
 * 
 * @returns {Promise<Object>} Un objeto que contiene:
 *  - token {string}: Token JWT de autenticación.
 *  - user {Object}: Datos públicos del usuario (id, username, email, profilePicture).
 * 
 * @throws {Error} Si ya existe un usuario con ese email o username.
 */
async registerUser({ username, email, password }) {
  // Verificar si ya existe un usuario con ese email o username
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] }
  });

  // Si existe, lanzar error controlado
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hashear la contraseña antes de guardarla en la base de datos
  const hashedPassword = await bcrypt.hash(password, 10);

  const now = new Date();
  // Crear el usuario en la base de datos
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      profilePicture: '', // Por defecto vacío,
      createdAt: now,
      updatedAt: now
    }
  });

  // Generar token de autenticación JWT con el id del usuario
  const token = generateToken(user.id);

  // Retornar token y datos públicos del usuario
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  };
}


  /**
 * Funcion para manejar el inicio de sesión de un usuario.
 *
 * Este método recibe las credenciales del usuario (email y contraseña),
 * verifica que el usuario exista en la base de datos y que la contraseña 
 * proporcionada sea válida. Si las credenciales son correctas, genera un token
 * de autenticación y devuelve los datos públicos del usuario junto con el token.
 * 
 * Si el usuario no existe o la contraseña no coincide, lanza un error con 
 * el mensaje 'Invalid credentials'.
 *
 * @param {Object} params - Objeto con las credenciales del usuario.
 * @param {string} params.email - Email del usuario.
 * @param {string} params.password - Contraseña en texto plano.
 * 
 * @returns {Promise<Object>} Un objeto que contiene:
 *  - token {string}: Token JWT de autenticación.
 *  - user {Object}: Datos públicos del usuario (id, username, email, profilePicture).
 * 
 * @throws {Error} Si las credenciales son inválidas.
 */
  async loginUser({ email, password }) {
    // Buscar el usuario por email en la base de datos
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Si no se encuentra el usuario, lanzar error
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Comparar la contraseña ingresada con la almacenada (hash)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no coincide, lanzar error
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar token de autenticación JWT con el id del usuario
    const token = generateToken(user.id);

    // Retornar token y datos públicos del usuario
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      }
    };
  }

}
