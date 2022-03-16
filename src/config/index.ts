// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace NodeJS {
  interface Global {
    secretKey: string;
    env: string;
    port: number;
    urlPrefix: string;
    urlVersion: string;
    databaseUrl: string;
    dbSchema: string;
    debugName: string;
  }
}

const getEnv = (envName: string) => {
  return process.env[envName];
};

const getEnvJSON = (envName: string) => {
  const env = getEnv(envName);
  if (env) {
    try {
      return JSON.parse(env);
    } catch (ex) {}
  }
};

global.secretKey = getEnv('SECRET_KEY') || 'Some-RandoM-SeCRet-KeY';
global.env = getEnv('ENV') || 'local';
global.port = Number.parseInt(getEnv('PORT') || '3000', 10);
global.urlPrefix = getEnv('URL_PREFIX') || '/api';
global.urlVersion = getEnv('URL_VERSION') || '/v1';
global.debugName = 'node-mongo-template';

global.databaseUrl = getEnv('DATABASE_URL') || 'mongodb://localhost:27017/node-mongo-template';
global.dbSchema = getEnv('DATABASE_SCHEMA') || 'node-mongo-template';
