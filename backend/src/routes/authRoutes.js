import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient();

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
      console.log('Body recibido:', req.body);
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    // Comprobar si el usuario existe

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    //hashear la contraseña:
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profilePicture: ''
      }
    });

    // Generar el token y mandarlo al cliente

    const token = generateToken(user.id)

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({message: `Internal server error ${error}`})
  }
});
router.post('/login', async (req, res) => {
  res.send('login');
});

export default router