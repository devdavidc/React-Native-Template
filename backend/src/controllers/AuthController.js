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
   * Controlador para registrar un usuario.
   * Valida los datos, delega la creación al servicio y responde al cliente.
   */
  register = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validar los datos de entrada con una función utilitaria
      const validationError = validateUserRegister({ username, email, password });
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

      // Registrar usuario llamando al servicio
      const result = await this.userService.registerUser({ username, email, password });

      // Responder con éxito
      res.status(201).json(result);
    } catch (error) {
      // Controlar error conocido y devolver código 400
      const message = error.message === 'User already exists'
        ? error.message
        : 'Internal server error';

      // Responder según tipo de error
      res.status(message === 'User already exists' ? 400 : 500).json({ message });
    }
  }

  login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationError = validateUserLogin({ email, password });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const result = await this.userService.loginUser({ email, password });

    res.status(200).json(result);

  } catch (error) {
    // Aquí se captura cualquier error lanzado desde loginUser
    console.error(error);
    const message = error.message === 'Invalid credentials' ? error.message : 'Internal server error';
    res.status(message === 'Invalid credentials' ? 401 : 500).json({ message });
  }
}

}
