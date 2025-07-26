// routes/cvRoutes.js

import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import CV from '../models/Cv.js';

const router = express.Router();

router.post('/save', authMiddleware, async (req, res) => {
  console.log('💡 Gelen istek verisi:', req.body);

  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ error: '⛔ filename eksik gönderildi!' });
  }

  try {
    const newCV = new CV({
      filename,
      userId: req.userId,
    });

    await newCV.save();
    return res.status(201).json({ message: '✅ CV kaydedildi', cv: newCV });
  } catch (error) {
    console.error('❌ Mongoose hatası:', error);
    return res.status(500).json({ error: 'CV kaydedilemedi', details: error });
  }
});

// ⬇️ BU SATIR GEREKLİ!
export default router;
