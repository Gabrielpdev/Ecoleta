import * as Knex from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<any> {
  return await knex("users").insert([
      { name: "AdminEcoleta" , 
        email: 'ecoleta@admin.com',
        password: await bcrypt.hash('123456', 8), 
        is_admin: true },
    ]);
};
