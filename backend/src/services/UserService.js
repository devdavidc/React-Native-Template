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
  async registerUser({ username, email, password }) {
    // Verificar si ya existe un usuario con ese email o username
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (existingUser) {
      // Lanzar error controlado si existe
      throw new Error('User already exists');
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePicture: '' // Por defecto vacío
      }
    });

    // Generar el token de autenticación
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

  async loginUser({ email, password }) {
    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Si no existe el usuario, lanza error
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no es válida, lanza error
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar el token de autenticación
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
