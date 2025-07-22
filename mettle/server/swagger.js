// server/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mettle API Docs',
      version: '1.0.0',
      description: 'Welcome to the Mettle API — a RESTful backend powering the Mettle platform. This API provides endpoints for user authentication, product browsing, article submission, and more. Authenticated users can submit and manage content, while public endpoints allow open access to products and articles. All protected routes require a valid JWT token sent via the Authorization header as a Bearer token. Use the documentation below to test requests, view request/response structures, and understand how to interact with each part of the system..',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Adjust if using a different port
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files with JSDoc comments
  
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
