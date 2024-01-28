import { app, sequelize } from '../express';
import request from 'supertest';

describe('e2e test for customer api', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'São Paulo',
          zip: '12345-678'
        }
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('Rua 1');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe('São Paulo');
    expect(response.body.address.zip).toBe('12345-678');
  });

  it('should not create a customer with invalid data', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
      });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Rua 1',
          number: 123,
          city: 'São Paulo',
          zip: '12345-678'
        }
      });

    await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Rua 2',
          number: 456,
          city: 'São Paulo',
          zip: '12345-678'
        }
      });

    const response = await request(app)
      .get('/customer');

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe('John Doe');
    expect(response.body.customers[1].name).toBe('Jane Doe');
  });
});