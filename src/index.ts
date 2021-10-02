// Iniciando carregamento das variaveis de ambiente.
import * as dotenv from 'dotenv';
dotenv.config();

// Iniciando conexão com o banco de dados mongodb.
import { MongoConnection } from './database';
const database = new MongoConnection();
database.connect();

// Iniciando configurações das rotas com express.
import express from 'express';
import urlsRoute from './routes/urls.route';

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Inclusão das rotas
app.use(urlsRoute);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Rodando na porta ${process.env.SERVER_PORT}`);
});