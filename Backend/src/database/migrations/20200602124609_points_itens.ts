import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('points_itens', table => {
    table.increments('id').primary();

    table.integer('point_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('points')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.integer('item_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('itens')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('points_itens');
}

