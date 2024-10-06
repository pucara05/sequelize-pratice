import app from './app.js'; // Importa `app` desde `app.js`
import sequelize from './config/database.js';
import dotenv from 'dotenv';

// Cargar el archivo .env.test si estamos en modo de pruebas
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config(); // Carga el archivo .env por defecto
}

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => { // Cambiado a '0.0.0.0'
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`);
      console.log(`API endpoint available at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
