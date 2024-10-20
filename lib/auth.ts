import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '';

export const verifyToken = (token: string) => {
  if (!token) throw new Error('No token provided');
  
  const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY) as { _id: string; role: string };
  
  return decoded;
};
