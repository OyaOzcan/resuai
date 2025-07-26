import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Kayıt
// Kayıt - Geliştirilmiş versiyon
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basit validasyon
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // E-posta kontrolü
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    // Hashleyip kaydet
    const hashed = await bcrypt.hash(password, 10);
    await new User({ email, password: hashed }).save();

    res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again later.' });
  }
});

// Giriş
// GİRİŞ - refresh token dahil// Giriş - Daha açıklayıcı hata mesajlarıyla
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Kullanıcıyı kontrol et
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'User not found.' }); // Daha net!
  }

  // Şifreyi kontrol et
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Incorrect password.' }); // Şifre yanlışsa
  }

  // Token üret
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

  // Refresh token’ı kullanıcıya kaydet
  user.refreshToken = refreshToken;
  await user.save();

  // Tokenları döndür
  res.json({ accessToken, refreshToken });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token expired or invalid' });
  }
});


export default router;
