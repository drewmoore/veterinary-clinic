const supertest = require('supertest');

const app = require('../../src/app');
const sequelize = require('../../src/db/client');

const request = supertest(app);

describe('Veterinary Clinic App Routes', () => {
  //TODO: clean db
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

  describe('/customers', () => {
    describe('POST', () => {
      let customer;
      let response;

      beforeEach(async () => {
        customer = {
          firstname: 'Rick',
          lastname: 'Sanchez',
          email: 'rick@get-shwifty.com'
        };
        response = await request.post('/customers').send(customer);
      });

      it('responds successfully with the new db entry', () => {
        expect(response.status).toEqual(200);
        expect(response.body.data).toEqual(expect.objectContaining(customer));
      });

    });
  });
});
