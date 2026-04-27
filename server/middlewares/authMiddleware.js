import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

// Middleware to verify if request is from an authenticated user (Member or SuperAdmin)
export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role, isSuperAdmin }
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware to enforce SuperAdmin access only
export const requireSuperAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    if (!req.user.isSuperAdmin) {
      return res.status(403).json({ error: 'Access denied. Requires SuperAdmin privileges.' });
    }
    next();
  });
};

// Middleware to enforce Group President access only
export const requirePresident = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.role !== 'ADMIN') { // we mapped President to 'ADMIN' role natively in prisma
      return res.status(403).json({ error: 'Access denied. Requires Group President privileges.' });
    }
    next();
  });
};
