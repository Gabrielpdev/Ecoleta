import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return await knex("itens").insert([
      {  title: "Lâmpadas" , image: 'lampadas.svg' },
      {  title: "Pilhas e Baterias" , image: 'baterias.svg' },
      {  title: "Papéis e Papelão" , image: 'papeis-papelao.svg' },
      {  title: "Resíduos Eletrônicos" , image: 'eletronicos.svg' },
      {  title: "Resíduos Orgânicos" , image: 'organicos.svg' },
      {  title: "Òleo de Cozinha" , image: 'oleo.svg' },
    ]);
};
