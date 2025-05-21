const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, password, login, firstName, lastName, phoneNumber, role } = req.body;

    // Проверка уникальности логина
    const existingUserByLogin = await prisma.user.findUnique({ 
      where: { login } 
    });
    if (existingUserByLogin) {
      return res.status(400).json({ error: 'Логин уже занят' });
    }

    // Проверка уникальности email
    const existingUserByEmail = await prisma.user.findUnique({ 
      where: { email } 
    });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email уже занят' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        login,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: role || 'USER' // Если роль не указана, по умолчанию 'USER'
      }
    });

    res.status(201).json({ message: 'Пользователь создан' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ 
      error: 'Ошибка регистрации',
      details: error.message 
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };