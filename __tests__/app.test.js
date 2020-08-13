require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  beforeAll(done => {
    return client.connect(done);
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
    execSync('npm run setup-db');
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns posters', async() => {

    const expectation = [
      {
        id: 'poster-2',
        name: 'Metamorphesis',
        image: 'BM_2019_poster.jpg',
        description: 'Burning Man: Metamorphesis 2019',
        in_stock: false,
        category: 2019,
        price: 12.00
      },
      {
        id: 'poster-3',
        name: 'I, Robot',
        image: 'BM_2018_poster.jpg',
        description: 'Burning Man: I, Robot 2018',
        in_stock: true,
        category: 2018,
        price: 12.00
      },
      {
        id: 'poster-4',
        name: 'Radical Ritual',
        image: 'BM_2017_poster.jpg',
        description: 'Burning Man: Radical Ritual 2017',
        in_stock: true,
        category: 2017,
        price: 12.00
      },
    ];

    const data = await fakeRequest(app)
      .get('/posters')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
