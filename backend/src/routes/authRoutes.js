import express from 'express';
import { UserService } from '../services/UserService.js';
import { AuthController } from '../controllers/AuthController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Crear instancia del servicio de usuarios
const userService = new UserService();

// Crear instancia del controlador, inyectando el servicio como dependencia
const authController = new AuthController(userService);

// 📌 Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// 📌 Ruta protegida solo para administradores
router.get('/users', authenticateToken, isAdmin, authController.getAllUsers);
router.get('/users/:id', authenticateToken, isAdmin, authController.getUserById);
router.put('/users/:id', authenticateToken, isAdmin, authController.updateUser);
router.put('/users/:id/password', authenticateToken, isAdmin, authController.updateUserPassword);
router.put('/users/:id/profile-picture', authenticateToken, isAdmin, authController.updateUserProfilePicture);
router.delete('/users/:id', authenticateToken, isAdmin, authController.deleteUser);

export default router;
