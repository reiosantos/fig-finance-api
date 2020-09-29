const definition = {
  info: {
    termsOfService: "http://swagger.io/terms/",
    contact: {
      name: "API Support",
      url: "http://test-api.com/support",
      email: "ronireiosantos@gmail.com"
    },
    title: "Node Mongo Template API docs",
    version: "1.0",
    description: 'A sample API',
  },
  host: "http://test-api.com/",
  basePath: '/'
}

const apis: Array<string> = [
  "src/controllers/*.ts"
];

const swaggerOptions = {
  swaggerDefinition: definition,
  apis
}

export default swaggerOptions;
