import { validateUserRegister } from '../utils/validateUserRegister.js';
import { validateUserLogin } from '../utils/validateUserLogin.js';
import { UserService } from '../services/UserService.js';

/**
 * Controlador de autenticación.
 * Recibe peticiones HTTP y delega en los services.
 */
export class AuthController {
  /**
   * Constructor que recibe dependencias (inyección de dependencias).
   * @param {UserService} userService - Servicio de usuarios.
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
 * Controlador para manejar el registro de nuevos usuarios.
 * 
 * Este método recibe los datos de registro desde el cliente,
 * valida los datos utilizando una función utilitaria, y si son válidos,
 * llama al servicio de usuario para crear el nuevo usuario en la base de datos.
 * Según el resultado, responde al cliente con el token y los datos públicos del usuario
 * o con el error correspondiente.
 * 
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * 
 * @returns {void}
 */
register = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la petición
    const { username, email, password } = req.body;

    // Validar los datos de entrada con una función utilitaria
    const validationError = validateUserRegister({ username, email, password });
    if (validationError) {
      // Si falla la validación, devolver código 400 con mensaje
      return res.status(400).json({ message: validationError });
    }

    // Registrar usuario llamando al servicio
    const result = await this.userService.registerUser({ username, email, password });

    // Si todo sale bien, responder con código 201 (creado) y los datos devueltos
    res.status(201).json(result);

  } catch (error) {
    // Controlar error conocido y devolver código 400 con mensaje adecuado
    const message = error.message === 'User already exists'
      ? error.message
      : 'Internal server error';

    // Responder según tipo de error (400 si el usuario ya existe, 500 si es otro error)
    res.status(message === 'User already exists' ? 400 : 500).json({ message });
  }
}


  /**
 * Controlador para manejar el inicio de sesión de usuario.
 *
 * Este método recibe una petición HTTP con el email y contraseña del usuario.
 * Primero valida los datos de entrada, luego delega el proceso de autenticación 
 * al servicio de usuario (UserService) y finalmente responde al cliente con 
 * un token de sesión y los datos públicos del usuario si las credenciales son válidas.
 * 
 * En caso de error, devuelve:
 *  - 400 si los datos de entrada no son válidos.
 *  - 401 si las credenciales son incorrectas.
 *  - 500 si ocurre un error interno del servidor.
 *
 * @param {Object} req - Objeto de petición HTTP (Request)
 * @param {Object} res - Objeto de respuesta HTTP (Response)
 * @returns {void}
 */
login = async (req, res) => {
  try {
    // Extraer email y password del cuerpo de la petición
    const { email, password } = req.body;

    // Validar datos de entrada
    const validationError = validateUserLogin({ email, password });
    if (validationError) {
      // Si hay error de validación, devolver 400 y mensaje descriptivo
      return res.status(400).json({ message: validationError });
    }

    // Llamar al servicio de usuario para realizar login
    const result = await this.userService.loginUser({ email, password });

    // Si todo sale bien, devolver 200 con los datos y token
    res.status(200).json(result);

  } catch (error) {
    // Mostrar error por consola (para desarrollo)
    console.error(error);

    // Determinar el mensaje a devolver al cliente según tipo de error
    const message = error.message === 'Invalid credentials'
      ? error.message
      : 'Internal server error';

    // Responder con código y mensaje adecuados
    res.status(message === 'Invalid credentials' ? 401 : 500).json({ message });
  }
}


}
