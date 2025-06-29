import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodepop API',
      version: '1.0.0',
      description: 'API for products management',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local API server',
      },
    ],
  },
  apis: [
    './api/routes/*.js',
    './api/controllers/apiProductController.js',
    './api/swagger/swaggerComponents.js',
    './api/swagger/docs/*.js',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
