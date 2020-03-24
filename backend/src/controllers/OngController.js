//Pegando a conexao com SGBD
const connection = require('../database/connection');
//Biblioteca NODE para que criptografia, mas que tem um metodo para gerar strings aleatorias. (Sera usado para gerar ID)
const crypto = require('crypto');

module.exports = {
    async index(request, response){

    const ongs = await connection('ongs').select('*');

    return response.json(ongs); 
    },

    async create(request, response) {
    
        //Fazendo destruturação, para garantir que um usuario não enviará um dado indesejado
    const {name, email, whatsapp, city, uf} = request.body;

    //Irá gerar 4 bits aleatorios que será convertido em string Hexadecimal.
    const id = crypto.randomBytes(4).toString('HEX');

    //Passando o nome da tabela e o metodo insert com as colunas necessarias.
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

    return response.json({id});
    }
}