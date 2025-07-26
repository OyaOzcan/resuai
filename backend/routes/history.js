import express from 'express';
import History from '../models/History.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Geçmişi al (JWT doğrulaması ile)
router.get('/:userId', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const history = await History.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'History fetch failed', error });
  }
});

export default router;
