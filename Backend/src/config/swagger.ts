import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación de Swagger (OpenAPI) para la API.
 *
 * @remarks
 * Este objeto configura Swagger mediante `swagger-jsdoc`.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Client Server NodeJS',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  // Amplía el patrón del docente para reconocer .route.ts (singular) y .routes.ts (plural).
  apis: [
    './src/presentation/modules/**/*.route.ts',
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
