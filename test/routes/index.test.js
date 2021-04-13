const supertest = require('supertest');

const app = require('../../src/app');
const sequelize = require('../../src/db/client');

const request = supertest(app);

describe('Veterinary Clinic App Routes', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  describe('/', () => {
    it('responds successfully', async () => {
      const response = await request.get('/');

      expect(response.status).toEqual(200);
      expect(response.text).toEqual('Hello!');
    });
  });

  describe('/health', () => {
    it('responds successfully', async () => {
      const response = await request.get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
