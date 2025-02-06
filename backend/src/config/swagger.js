const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Galeria de Imagens",
      version: "1.0.0",
      description: "API para gerenciamento de imagens com autenticação",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Arquivos que contêm as anotações
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
