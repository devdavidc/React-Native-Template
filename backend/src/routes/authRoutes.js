import express from 'express';
import { UserService } from '../services/UserService.js';
import { AuthController } from '../controllers/AuthController.js';

const router = express.Router();

// Crear instancia del servicio de usuarios
const userService = new UserService();

// Crear instancia del controlador, inyectando el servicio como dependencia
const authController = new AuthController(userService);

// Definir rutas de autenticación
// Ruta de registro
router.post('/register', authController.register);

// Ruta de login
router.post('/login', authController.login);

export default router;
