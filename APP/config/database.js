const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME || 'escola',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
);

db.authenticate()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch((err) => console.error('Erro ao conectar ao banco:', err));

  const sequelize = new Sequelize('escola', 'postgres', 'sua-senha', {
  host: 'db',
  dialect: 'postgres',
  port: 5432, // Certifique-se de que está usando a porta correta
  logging: false
});

module.exports = db;