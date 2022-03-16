const definition = {
  info: {
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      name: 'API Support',
      url: 'http://test-api.com/support',
      email: 'ronireiosantos@gmail.com'
    },
    title: 'Node Mongo Fig/Finance API docs',
    version: '1.0',
    description: 'API'
  },
  host: 'http://test-api.com/',
  basePath: '/'
};

const apis: Array<string> = ['src/controllers/*.ts'];

const swaggerOptions = {
  swaggerDefinition: definition,
  apis
};

export default swaggerOptions;
