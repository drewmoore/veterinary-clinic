const supertest = require('supertest');

const app = require('../../src/app');
const request = supertest(app);

describe('/', () => {
  it('responds successfully', async () => {
    const response = await request.get('/');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello!');
  });
});
