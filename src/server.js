import app from './app.js'; // Importa `app` desde `app.js`
import sequelize from './config/database.js';

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`);
      console.log(`API endpoint available at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
