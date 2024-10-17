import express from 'express';
import setupSwagger from './swagger/swagger.js';
import userRoutesv1 from './routes/v1/userRoutes.js';
//import sequelize from './config/database.js';
import { collectDefaultMetrics, register } from 'prom-client'; // Importar prom-client
//import dotenv from 'dotenv';

const app = express();
app.use(express.json());

// Iniciar la recolección de métricas predeterminadas
collectDefaultMetrics();

// Endpoint para las métricas de Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/api/v1', userRoutesv1);
setupSwagger(app);

console.log({
    host:process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

export default app;
