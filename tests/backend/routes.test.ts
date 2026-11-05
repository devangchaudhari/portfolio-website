import request from 'supertest';
import app from '../../server/src/index';

describe('Backend API Suite', () => {
  describe('GET /api/health', () => {
    it('should return 200 and healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe('healthy');
      expect(res.body).toHaveProperty('uptimeSeconds');
    });
  });

  describe('GET /api/projects', () => {
    it('should return portfolio projects', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return specific project by valid slug', async () => {
      const res = await request(app).get('/api/projects/enterprise-data-integration');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('enterprise-data-integration');
    });

    it('should return 404 for nonexistent project slug', async () => {
      const res = await request(app).get('/api/projects/non-existent-system');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/contact', () => {
    it('should reject submission with missing required fields', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'A', // too short
        email: 'invalid-email',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should accept valid contact submission', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Technical Recruiter',
        email: 'recruiter@techcorp.com',
        subject: 'Senior Software Engineer Role in Pune',
        message: 'Hello Devang, we reviewed your enterprise data integration and backend experience and would like to connect.',
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should trigger honeypot silent trap if website field is filled', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Spam Bot',
        email: 'spammer@botnet.com',
        subject: 'Unsolicited Spam Message Offer',
        message: 'Buy our automated backlinks now with special promotional pricing today.',
        website: 'http://spam-link.ru',
      });
      // Returns 200 to fool bot, but discarded in logs without sending email
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
