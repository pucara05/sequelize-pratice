import 'dotenv/config'; // Carga las variables de entorno desde .env

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: process.env.DB_NAME_TEST || 'myapp_test', // Base de datos de prueba
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
  }
};

export default config;









/*  conectarse a bd postgresql 
import "dotenv/config"; // Carga las variables de entorno desde .env

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
  }
};

export default config;
*/