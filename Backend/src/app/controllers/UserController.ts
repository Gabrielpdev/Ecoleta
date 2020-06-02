import { Request, Response } from 'express';
import knex from '../../database/connection';
import bcrypt from 'bcryptjs';


class ItensController {
  async create (request: Request, response: Response) {
    let {
      name,
      email,
      password
    } = request.body;

    if(password) {
      password = await bcrypt.hash(password, 8);
    }

    const user = {
      name,
      email,
      password
    }
    
    await knex('users').insert(user)
    
    return response.json(user);
  }
}

export default ItensController;
