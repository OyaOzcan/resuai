import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Authorization Header:', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('⛔ Token eksik');
    return res.status(401).json({ error: 'Token gerekli' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decode edildi:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Token doğrulanamadı:', err.message);
    res.status(401).json({ error: 'Geçersiz token' });
  }
};

export default authenticate;
