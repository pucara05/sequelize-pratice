import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Carga las variables de entorno desde .env
import config from '../config/config.js'; // Asegúrate de tener tu archivo config.js para manejar las configuraciones


// Determina el entorno actual (development, test, production)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];


// Usa la configuración específica del entorno
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  logging: false, // Puedes habilitar el registro si necesitas depuración
});





/*
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false, // Puedes habilitar el registro si necesitas depuración
});
*/

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;


