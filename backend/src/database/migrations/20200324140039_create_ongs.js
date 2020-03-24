
exports.up = function(knex) {
    //Migration que será executado ao criar a tabela (Executar esse arquivo)
  knex.schema.createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  })
};

//Migration que e usada se algo der errado na criação da tabela. (Desfazer o que foi feito acima)
exports.down = function(knex) {
  return knex.table.dropTable('ongs');
};
