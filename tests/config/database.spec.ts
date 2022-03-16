import MongoClient from '@san/config/database';
import { expect } from 'chai';

describe('init db', () => {
  before(() => {
    return new MongoClient().getClient().then(r => {
      expect(r).to.not.be.undefined;
      expect(r).to.haveOwnProperty('id');
    });
  });

  it('should update test database', done => {
    done();
  });
});
