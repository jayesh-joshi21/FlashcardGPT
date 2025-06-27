const request = require('supertest');
const path = require('path');
const app = require('../app'); 

describe('POST /upload', () => {
  it('200 - valid PDF', async () => {
    const pdfPath = path.join(__dirname, 'sample.pdf'); 

    const res = await request(app)
      .post('/upload')
      .field('count', '5')
      .attach('pdf', pdfPath);

    expect(res.statusCode).toBe(200);
    expect(res.body.flashcards).toBeDefined();
  });

  it('500 - PDF missing', async () => {
    const res = await request(app)
      .post('/upload')
      .field('count', '5');

    expect(res.statusCode).toBe(500);
  });
});
