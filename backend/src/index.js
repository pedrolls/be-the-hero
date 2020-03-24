const express = require('express'); 
const cors = require('cors');
const routes = require('./routes');


const app = express();

//Dessa forma todas as aplicações frontEnd acessarão a nossa aplicação
app.use(cors());
//Informar ao express que usará json no corpo das requisições
app.use(express.json());
app.use(routes);


app.listen(3333);   