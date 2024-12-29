const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

exports.verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    console.log('Authorization Header:', authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or Invalid Authorization Header');
      return res.status(403).json({ error: 'Access denied' });
    }
  
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded Token:', decoded);
      req.user = decoded; 
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err.message); 
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
  

// exports.authorizeRoles = (roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) {
//     return res.status(403).json({ error: 'Access forbidden: insufficient rights' });
//   }
//   next();
// };