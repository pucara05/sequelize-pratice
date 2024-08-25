import express from 'express';
import setupSwagger from './swagger/swagger.js';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`);
      console.log(`API endpoint available at: http://localhost:${PORT}/api`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });