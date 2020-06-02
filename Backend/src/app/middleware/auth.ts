import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req:Request, res:Response, next:NextFunction) => {
  const authheader = req.headers.authorization;

  if (!authheader) {
    return res.status(401).json({ error: 'Token not provied' });
  }

  const [, token] = authheader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
