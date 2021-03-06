import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import knex from '../../database/connection';

export default async (req:Request, res:Response, next:NextFunction) => {
  const authheader = req.headers.authorization;

  const [, token] = authheader.split(' ');
  const decoded = await promisify(jwt.verify)(token, authConfig.secret);
  
  const {is_admin} = await knex('users')
  .where('id', decoded.id)
  .first()

  if(is_admin !== 1){
    return res.status(401).json({ error: 'Whitout permission' });
  }

  return next();
};
