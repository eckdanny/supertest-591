const request = require('supertest');
const app = require('../server');

describe('GET /people/:id', () => {
	it('returns a person repr', async () => {
		const res = await request(app).get('/api/people/1');
		expect(res.status).toBe(200);
		expect(res.type).toBe('application/json');
  });
  
  it('404s with an error message', async () => {
    const res = await request(app).get('/api/people/0');
    expect(res.status).toBe(404);
    expect(res.type).toBe('application/json');
    const json = JSON.parse(res.text);
    expect(json).toEqual({ detail: "Not found" });
  })
});
