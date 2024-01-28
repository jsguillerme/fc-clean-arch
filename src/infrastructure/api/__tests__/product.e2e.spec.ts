import { app, sequelize } from '../express';
import request from 'supertest';

describe('e2e test for product api', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        type: 'a',
        name: 'product a',
        price: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('product a');
    expect(response.body.price).toBe(10);
  });

  it('should list all products', async () => {
    await request(app)
      .post('/product')
      .send({
        type: 'a',
        name: 'product a',
        price: 10,
      });

    await request(app)
      .post('/product')
      .send({
        type: 'b',
        name: 'product b',
        price: 20,
      });

    const response = await request(app)
      .get('/product');

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0].name).toBe('product a');
    expect(response.body.products[1].name).toBe('product b');
  })
});