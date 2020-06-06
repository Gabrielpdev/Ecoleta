import { Request, Response } from 'express';
import knex from '../../database/connection';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';


class SessionController {
  async create(req: Request, res: Response) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user =  await knex('users').where('email', email).select('*').first()

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Password does not corect' });
    }

    const { id, name, is_admin } = user;

    return res.json({
      user: {
        id,
        email,
        name,
        is_admin,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default SessionController;
