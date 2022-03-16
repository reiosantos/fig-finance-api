import 'module-alias/register';
import * as http from 'http';
import app from './index';
import { AddressInfo } from 'net';
import MongoClient from '@san/config/database';
import logger from '@san/util/logger';

(async () => {
  // Only start the server if the mongo connection is active
  const client = new MongoClient();
  await client.getClient();

  const server = http.createServer(app);

  server.listen(global.port, () => {
    const address: AddressInfo | string | null = server.address();
    if (address && typeof address !== 'string') {
      logger.info(`Find me on http://localhost:${address.port}`);
    } else {
      logger.error(`Unable to start server on port ${global.port}`);
    }
  });
})();
