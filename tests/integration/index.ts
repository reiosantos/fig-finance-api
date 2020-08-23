import '@san/init';
import MongoClient from "@san/config/database";

global.databaseUrl += '_test';
global.dbSchema += '_test';


describe('init db', () => {
  beforeAll(async (done) => {
    await (new MongoClient()).getClient()
    done();
  });

  it('should update test database', async (done) => {
    done();
  });
});
