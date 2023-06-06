import swaggerJsdoc from 'swagger-jsdoc'
import packageJson from '../../package.json'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Template API NodeJS+Express+Typescript',
      version: packageJson.version,
      description: 'Test API',
    },
  },
  apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
