import express from 'express';
import setupSwagger from './swagger/swagger.js';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
setupSwagger(app);

export default app;
