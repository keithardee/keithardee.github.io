const request = require('supertest');
const app = require('../src/index');

describe('Contact API', () => {
  it('returns 400 for missing fields', async () => {
    const res = await request(app).post('/api/contact').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('sends message via ethereal fallback in test mode', async () => {
    process.env.USE_ETHEREAL = 'true';
    const payload = { name: 'Test User', email: 'test@example.com', message: 'Hello from test' };
    const res = await request(app).post('/api/contact').send(payload).timeout({ deadline: 30000 });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    // previewUrl is included when using ethereal in test mode
    expect(res.body).toHaveProperty('previewUrl');
  });
});
