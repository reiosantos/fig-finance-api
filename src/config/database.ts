import mongoose, { Connection, ConnectionOptions } from "mongoose";
import logger from "@san/util/logger";

class MongoClient {
  options: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: true,
    useUnifiedTopology: true
  };

  private static instance: Connection;
  private static exists: boolean;

  async getClient() {
    const DB_URL = global.databaseUrl;
    try {
      await mongoose.connect(DB_URL, this.options);
      mongoose.Promise = global.Promise;

      const { connection } = mongoose;

      connection.on("error", (error: string) => {
        logger.error(`Error occurred: ${error}`);
      });

      MongoClient.instance = connection;
      MongoClient.exists = true;

      return MongoClient.instance;
    } catch (e) {
      logger.error(e)
      throw Error(`Unable to connect to database: ${e}`);
    }
  }
}

export default MongoClient;
