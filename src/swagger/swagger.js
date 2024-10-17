import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API   documentation",
    },
  },
apis: ["./src/routes/v1/*.js"] // Correcto: Busca dentro de la subcarpeta v1

};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
