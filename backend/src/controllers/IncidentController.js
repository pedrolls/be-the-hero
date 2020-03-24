const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //Paginação feita
        const { page = 1 } = request.query;

        //Pegando a quantidade total de registros. 
        //Essa quantidade total deve ser retornada pelo HEADER e nao pelo corpo da requisição (BODY)
        const [cont] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) //Limite de 5 resultados por pagina
        .offset((page - 1 ) * 5) //A pagina 1 será 0. Pegando os 5 registros.
        .select('incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf');

        //Passando o total de resgistros pelo header
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);  
    },
    async create(request, response){
        const {title, description, value} = request.body;
        
        //Headers e onde tem o contexto da requisição. Como id, localização para msg em PT ou EN
        const ong_id = request.headers.authorization;

        //[id] desestruturando e retornando resultado unico.
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        //Retorno entre chaves para o que o front end saida que e o id.
        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        //Headers e onde tem o contexto da requisição. Como id, localização para msg em PT ou EN
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incident.ong_id != ong_id){
                return response.status(401).json({ error: 'Operation Not Permited'});
            }

            await connection('incidents').where('id',id).delete();

            return response.status(204).send(); 
    }
};