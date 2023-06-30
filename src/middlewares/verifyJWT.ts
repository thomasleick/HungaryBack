import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface DecodedToken {
  UserInfo: {
    name: string;
    email: string;
    id: string;
  };
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const authHeaderValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;

  if (typeof authHeaderValue !== 'string' || !authHeaderValue.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authHeaderValue.split(' ')[1];
  const secret: Secret = process.env.ACCESS_TOKEN_SECRET || '';

  try {
    const decoded = jwt.verify(token, secret) as DecodedToken;
    res.locals.user = {
      name: decoded.UserInfo.name,
      email: decoded.UserInfo.email,
      id: decoded.UserInfo.id,
    };
    next();
  } catch (err) {
    return res.sendStatus(403); // invalid token
  }
};

export default verifyJWT;