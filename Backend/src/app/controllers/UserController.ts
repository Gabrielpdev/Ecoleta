import { Request, Response } from 'express';
import * as Yup from 'yup';
import knex from '../../database/connection';
import bcrypt from 'bcryptjs';


class ItensController {
  async create (request: Request, response: Response) {
    let {
      name,
      email,
      password,
      is_admin
    } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
      is_admin: Yup.boolean().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const checkUser = await knex('users')
    .where('email', email)
    .first();

    if(checkUser){
      return response.status(400).json({error: 'This email already exists'})
    }

    if(password) {
      password = await bcrypt.hash(password, 8);
    }

    const user = {
      name,
      email,
      password,
      is_admin
    }
    
    const userId = await knex('users').insert(user)

    return response.json({id:userId[0],...user});
  }
}

export default ItensController;
