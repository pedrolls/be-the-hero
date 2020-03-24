
exports.up = function(knex) {
    //Migration que será executado ao criar a tabela (Executar esse arquivo)
    knex.schema.createTable('incidents', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('descrition').notNullable();
        table.string('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
  return table.schema.dropTable('incidents')
};
