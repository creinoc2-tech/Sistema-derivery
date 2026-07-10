import { Hono } from "hono";
 
import { errorHandler } from "./src/middlewares/error-handler";
import { categoriesRoutes } from "./src/modules/categories/categories.routes";
import { swaggerUI } from '@hono/swagger-ui'
import { restaurantsRoutes } from "./src/modules/restaurants/restaurants.routes";

// A basic OpenAPI document
const openApiDoc = {
  openapi: '3.0.0', // This is the required version field
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your service',
  },
  paths: {
    // Add your API paths here
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    // Add more endpoints as needed
  },
};

const app = new Hono();

// Serve the OpenAPI document
app.get('/doc', (c) => c.json(openApiDoc))

// Use the middleware to serve Swagger UI at /ui
app.get('/ui', swaggerUI({ url: '/doc' }))

app.get('/health', (c) => c.text('OK'))

app.onError(errorHandler);
app.route("/restaurants/:restaurantId/categories", categoriesRoutes);
app.route("/restaurants", restaurantsRoutes);

export default app;
