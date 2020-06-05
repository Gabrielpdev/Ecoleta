import { Request, Response } from 'express';
import * as Yup from 'yup';
import knex from '../../database/connection';
import bcrypt from 'bcryptjs';

class UserController {
  async index (request: Request, response: Response) {
    
    const data = await knex.select('name', 'email', 'is_admin').from('users')

    return response.json(data);
  }

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

  async update(request: Request, response: Response){
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(3),
      password: Yup.string()
        .min(3)
        .when('oldPassword', (oldPassword: string, field: any) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password: string, field: any) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      is_admin: Yup.boolean()
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    var {name, email, oldPassword, password ,is_admin } = request.body;
    const { id } = request.params;
   
    const user = await knex('users')
      .where('id', id)
      .first()

    //verificando se já existe outro usuario com o email
    if (email !== user.email) {
      const checkUser = await knex('users')
      .where('email', email)
      .first();
  
      if(checkUser){
        return response.status(400).json({error: 'This email already exists'})
      }
    }

    // criptografando senha
    if(password) {
      password = await bcrypt.hash(password, 8);
    }
    // verificando se senha antiga é igual
    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const data = {
      name,
      email, 
      is_admin,
      password
    }
    
    await knex('users').where('id', id).update(data)

    return response.json({ message: 'User updated'});
  

  }

  async destroy(request: Request, response: Response){
    const { id } = request.params;

    const checkUser = await knex('users').where('id', id).first();

    if(!checkUser){
      return response.status(400).json({ error: 'User not exist' });
    }

    await knex('users').where('id', id).del()

    return response.json({ message: 'User deleted'});
  }
}

export default UserController;
