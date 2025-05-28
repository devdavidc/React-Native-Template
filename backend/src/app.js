import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';

const app = express();


// Middleware para parsear cuerpos JSON en las solicitudes
app.use(express.json());

// Middleware para definir rutas bajo el prefijo /api/auth
app.use('/api/auth', authRoutes);

/**
 * Aquí puedes añadir más middlewares globales:
 * - logger para registrar peticiones
 * - cors para manejo de orígenes cruzados
 * - helmet para seguridad HTTP headers
 * - limitadores de velocidad, etc.
 * 
 * Ejemplo:
 * // import cors from 'cors';
 * // app.use(cors());
 */

/**
 * Aquí puedes definir más rutas principales:
 * - app.use('/api/users', userRoutes);
 * - app.use('/api/products', productRoutes);
 * etc.
 */

/**
 * Aquí se puede añadir un middleware para manejo global de errores,
 * que capture errores no manejados y responda con mensajes adecuados.
 * Ejemplo:
 * app.use((err, req, res, next) => {
 *   console.error(err.stack);
 *   res.status(500).json({ message: 'Internal server error' });
 * });
 */

export default app;